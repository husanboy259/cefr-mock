import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { supabase, insert, remove } from '../../config/database';
import { env } from '../../config/env';
import { ConflictError, UnauthorizedError, NotFoundError } from '../../shared/errors';
import { JwtPayload } from '../../middleware/authenticate';
import { RegisterDto, LoginDto } from './auth.schema';

function signAccessToken(payload: JwtPayload): string {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN } as any);
}

function signRefreshToken(payload: JwtPayload): string {
  return jwt.sign(payload, env.JWT_REFRESH_SECRET, { expiresIn: env.JWT_REFRESH_EXPIRES_IN } as any);
}

export async function register(dto: RegisterDto) {
  // Check if email or username already exists
  const { data: existing } = await supabase
    .from('users')
    .select('id')
    .or(`email.eq.${dto.email},username.eq.${dto.username}`)
    .limit(1);

  if (existing && existing.length > 0) throw new ConflictError('Email or username already taken');

  const password_hash = await bcrypt.hash(dto.password, 12);

  const { data: user, error } = await supabase
    .from('users')
    .insert({ username: dto.username, email: dto.email, password_hash, full_name: dto.full_name ?? null })
    .select('id, username, email, is_admin')
    .single();

  if (error) throw new Error(error.message);

  const payload: JwtPayload = { userId: user.id, email: user.email, username: user.username, isAdmin: user.is_admin };
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);
  const tokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');

  await supabase.from('refresh_tokens').insert({
    user_id: user.id,
    token_hash: tokenHash,
    expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  });

  return { accessToken, refreshToken, user: { id: user.id, username: user.username, email: user.email, isAdmin: user.is_admin } };
}

export async function login(dto: LoginDto) {
  const { data: users } = await supabase
    .from('users')
    .select('id, username, email, password_hash, is_admin, is_active')
    .eq('email', dto.email)
    .limit(1);

  const user = users?.[0];
  if (!user) throw new UnauthorizedError('Invalid email or password');
  if (!user.is_active) throw new UnauthorizedError('Account is deactivated');

  const valid = await bcrypt.compare(dto.password, user.password_hash);
  if (!valid) throw new UnauthorizedError('Invalid email or password');

  const payload: JwtPayload = { userId: user.id, email: user.email, username: user.username, isAdmin: user.is_admin };
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);
  const tokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');

  await supabase.from('refresh_tokens').insert({
    user_id: user.id,
    token_hash: tokenHash,
    expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  });

  return { accessToken, refreshToken, user: { id: user.id, username: user.username, email: user.email, isAdmin: user.is_admin } };
}

export async function refresh(refreshToken: string) {
  let payload: JwtPayload;
  try {
    payload = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET) as JwtPayload;
  } catch {
    throw new UnauthorizedError('Invalid refresh token');
  }

  const tokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');
  const { data: tokens } = await supabase
    .from('refresh_tokens')
    .select('id, user_id')
    .eq('token_hash', tokenHash)
    .gt('expires_at', new Date().toISOString())
    .limit(1);

  if (!tokens || tokens.length === 0) throw new UnauthorizedError('Refresh token not found or expired');

  await supabase.from('refresh_tokens').delete().eq('id', tokens[0].id);

  const newAccessToken = signAccessToken(payload);
  const newRefreshToken = signRefreshToken(payload);
  const newHash = crypto.createHash('sha256').update(newRefreshToken).digest('hex');

  await supabase.from('refresh_tokens').insert({
    user_id: payload.userId,
    token_hash: newHash,
    expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  });

  return { accessToken: newAccessToken, refreshToken: newRefreshToken };
}

export async function logout(refreshToken: string) {
  const tokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');
  await supabase.from('refresh_tokens').delete().eq('token_hash', tokenHash);
}

export async function telegramAuth(initData: string) {
  // Validate Telegram initData
  const params = new URLSearchParams(initData);
  const hash = params.get('hash');
  if (!hash) throw new UnauthorizedError('Invalid Telegram data');

  params.delete('hash');
  const dataCheckString = Array.from(params.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}=${v}`)
    .join('\n');

  const secretKey = crypto.createHmac('sha256', 'WebAppData').update(env.TELEGRAM_BOT_TOKEN).digest();
  const expectedHash = crypto.createHmac('sha256', secretKey).update(dataCheckString).digest('hex');

  if (expectedHash !== hash) throw new UnauthorizedError('Invalid Telegram signature');

  const userParam = params.get('user');
  if (!userParam) throw new UnauthorizedError('No user data');
  const tgUser = JSON.parse(userParam);

  const telegramId = String(tgUser.id);
  const username = tgUser.username || `tg_${telegramId}`;
  const fullName = [tgUser.first_name, tgUser.last_name].filter(Boolean).join(' ');
  const email = `${telegramId}@telegram.user`;

  // Find or create user
  let { data: existing } = await supabase
    .from('users')
    .select('id, username, email, is_admin')
    .eq('email', email)
    .limit(1);

  let user = existing?.[0];

  if (!user) {
    const password_hash = await bcrypt.hash(crypto.randomBytes(32).toString('hex'), 12);
    const { data: created, error } = await supabase
      .from('users')
      .insert({ username, email, password_hash, full_name: fullName })
      .select('id, username, email, is_admin')
      .single();
    if (error) throw new Error(error.message);
    user = created;
  }

  const payload: JwtPayload = { userId: user.id, email: user.email, username: user.username, isAdmin: user.is_admin };
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);
  const tokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');

  await supabase.from('refresh_tokens').insert({
    user_id: user.id,
    token_hash: tokenHash,
    expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  });

  return { accessToken, refreshToken, user: { id: user.id, username: user.username, email: user.email, isAdmin: user.is_admin } };
}

export async function getMe(userId: string) {
  const { data: user } = await supabase
    .from('users')
    .select('id, username, email, full_name, avatar_url, is_admin, created_at')
    .eq('id', userId)
    .single();

  if (!user) throw new NotFoundError('User');
  return user;
}
