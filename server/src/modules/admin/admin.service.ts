import { supabase } from '../../config/database';
import { NotFoundError } from '../../shared/errors';

export async function getSiteStats() {
  const [
    { count: total_users },
    { count: total_exercises },
    { count: published_exercises },
    { count: writing_pending },
    { count: speaking_pending },
  ] = await Promise.all([
    supabase.from('users').select('*', { count: 'exact', head: true }).eq('is_admin', false),
    supabase.from('exercises').select('*', { count: 'exact', head: true }),
    supabase.from('exercises').select('*', { count: 'exact', head: true }).eq('is_published', true),
    supabase.from('writing_submissions').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('speaking_submissions').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
  ]);
  return { total_users, total_exercises, published_exercises, writing_pending, speaking_pending };
}

export async function getUsers(page = 1, limit = 20, search?: string) {
  let q = supabase
    .from('users')
    .select('id, username, email, full_name, is_active, is_admin, created_at')
    .order('created_at', { ascending: false })
    .range((page - 1) * limit, page * limit - 1);

  if (search) q = q.or(`username.ilike.%${search}%,email.ilike.%${search}%`);

  const { data } = await q;
  return data ?? [];
}

export async function toggleUserActive(id: string) {
  const { data: user } = await supabase.from('users').select('is_active').eq('id', id).single();
  if (!user) throw new NotFoundError('User');

  const { data } = await supabase
    .from('users')
    .update({ is_active: !user.is_active })
    .eq('id', id)
    .select('id, username, is_active')
    .single();
  return data;
}

export async function createExercise(data: any) {
  const { data: ex, error } = await supabase.from('exercises').insert(data).select().single();
  if (error) throw new Error(error.message);
  return ex;
}

export async function updateExercise(id: string, data: any) {
  const allowed = ['title','description','instructions','level','difficulty','thumbnail_url','tags','estimated_minutes','category_id'];
  const update: any = {};
  for (const k of allowed) if (data[k] !== undefined) update[k] = data[k];

  const { data: ex, error } = await supabase.from('exercises').update(update).eq('id', id).select().single();
  if (error || !ex) throw new NotFoundError('Exercise');
  return ex;
}

export async function togglePublish(id: string) {
  const { data: ex } = await supabase.from('exercises').select('is_published').eq('id', id).single();
  if (!ex) throw new NotFoundError('Exercise');

  const { data } = await supabase
    .from('exercises')
    .update({ is_published: !ex.is_published })
    .eq('id', id)
    .select('id, title, is_published')
    .single();
  return data;
}

export async function deleteExercise(id: string) {
  await supabase.from('exercises').delete().eq('id', id);
}

export async function getPendingWriting(page = 1, limit = 20) {
  const { data } = await supabase
    .from('writing_submissions')
    .select('*, users(username), exercises(title)')
    .eq('status', 'pending')
    .order('submitted_at')
    .range((page - 1) * limit, page * limit - 1);
  return data ?? [];
}

export async function gradeWriting(id: string, graderId: string, data: { score: number; max_score: number; feedback?: string; criteria_scores?: any }) {
  const { data: sub, error } = await supabase
    .from('writing_submissions')
    .update({ status: 'graded', score: data.score, max_score: data.max_score, feedback: data.feedback ?? null, criteria_scores: data.criteria_scores ?? {}, graded_by: graderId, graded_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  if (error || !sub) throw new NotFoundError('Submission');
  return sub;
}

export async function getPendingSpeaking(page = 1, limit = 20) {
  const { data } = await supabase
    .from('speaking_submissions')
    .select('*, users(username), exercises(title)')
    .eq('status', 'pending')
    .order('submitted_at')
    .range((page - 1) * limit, page * limit - 1);
  return data ?? [];
}

export async function gradeSpeaking(id: string, graderId: string, data: { score: number; max_score: number; feedback?: string; criteria_scores?: any }) {
  const { data: sub, error } = await supabase
    .from('speaking_submissions')
    .update({ status: 'graded', score: data.score, max_score: data.max_score, feedback: data.feedback ?? null, criteria_scores: data.criteria_scores ?? {}, graded_by: graderId, graded_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  if (error || !sub) throw new NotFoundError('Submission');
  return sub;
}
