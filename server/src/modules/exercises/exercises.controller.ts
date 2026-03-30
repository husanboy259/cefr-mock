import { Request, Response, NextFunction } from 'express';
import * as svc from './exercises.service';

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await svc.listExercises({
      type: req.query.type as string,
      level: req.query.level as string,
      category: req.query.category as string,
      search: req.query.search as string,
      featured: req.query.featured as string,
      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 20,
    });
    res.json(result);
  } catch (err) { next(err); }
}

export async function detail(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await svc.getExercise(req.params.id));
  } catch (err) { next(err); }
}

export async function content(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await svc.getExerciseContent(req.params.id));
  } catch (err) { next(err); }
}

export async function bookmark(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await svc.toggleBookmark(req.user!.userId, req.params.id));
  } catch (err) { next(err); }
}

export async function getBookmarks(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await svc.getUserBookmarks(req.user!.userId));
  } catch (err) { next(err); }
}
