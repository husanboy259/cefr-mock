import { Request, Response, NextFunction } from 'express';
import * as authService from './auth.service';

export async function registerCtrl(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await authService.register(req.body);
    res.status(201).json(result);
  } catch (err) { next(err); }
}

export async function loginCtrl(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await authService.login(req.body);
    res.json(result);
  } catch (err) { next(err); }
}

export async function refreshCtrl(req: Request, res: Response, next: NextFunction) {
  try {
    const { refreshToken } = req.body;
    const result = await authService.refresh(refreshToken);
    res.json(result);
  } catch (err) { next(err); }
}

export async function logoutCtrl(req: Request, res: Response, next: NextFunction) {
  try {
    const { refreshToken } = req.body;
    await authService.logout(refreshToken);
    res.json({ message: 'Logged out' });
  } catch (err) { next(err); }
}

export async function getMeCtrl(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await authService.getMe(req.user!.userId);
    res.json(user);
  } catch (err) { next(err); }
}

export async function telegramAuthCtrl(req: Request, res: Response, next: NextFunction) {
  try {
    const { initData } = req.body;
    const result = await authService.telegramAuth(initData);
    res.json(result);
  } catch (err) { next(err); }
}
