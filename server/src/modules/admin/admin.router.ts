import { Router } from 'express';
import { authenticate } from '../../middleware/authenticate';
import { requireAdmin } from '../../middleware/authorize';
import * as svc from './admin.service';

const router = Router();
router.use(authenticate, requireAdmin);

router.get('/stats', async (_req, res, next) => { try { res.json(await svc.getSiteStats()); } catch (e) { next(e); } });

router.get('/users', async (req, res, next) => {
  try { res.json(await svc.getUsers(Number(req.query.page) || 1, 20, req.query.search as string)); } catch (e) { next(e); }
});
router.patch('/users/:id/toggle', async (req, res, next) => {
  try { res.json(await svc.toggleUserActive(req.params.id)); } catch (e) { next(e); }
});

router.post('/exercises', async (req, res, next) => {
  try { res.status(201).json(await svc.createExercise({ ...req.body, created_by: req.user!.userId })); } catch (e) { next(e); }
});
router.patch('/exercises/:id', async (req, res, next) => {
  try { res.json(await svc.updateExercise(req.params.id, req.body)); } catch (e) { next(e); }
});
router.delete('/exercises/:id', async (req, res, next) => {
  try { await svc.deleteExercise(req.params.id); res.status(204).end(); } catch (e) { next(e); }
});
router.post('/exercises/:id/publish', async (req, res, next) => {
  try { res.json(await svc.togglePublish(req.params.id)); } catch (e) { next(e); }
});

router.get('/submissions/writing', async (req, res, next) => {
  try { res.json(await svc.getPendingWriting(Number(req.query.page) || 1)); } catch (e) { next(e); }
});
router.patch('/submissions/writing/:id', async (req, res, next) => {
  try { res.json(await svc.gradeWriting(req.params.id, req.user!.userId, req.body)); } catch (e) { next(e); }
});

router.get('/submissions/speaking', async (req, res, next) => {
  try { res.json(await svc.getPendingSpeaking(Number(req.query.page) || 1)); } catch (e) { next(e); }
});
router.patch('/submissions/speaking/:id', async (req, res, next) => {
  try { res.json(await svc.gradeSpeaking(req.params.id, req.user!.userId, req.body)); } catch (e) { next(e); }
});

export default router;
