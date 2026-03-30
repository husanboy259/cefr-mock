import { Router } from 'express';
import { authenticate } from '../../middleware/authenticate';
import * as svc from './writing.service';

const router = Router();
router.use(authenticate);

router.get('/:exerciseId/task', async (req, res, next) => {
  try { res.json(await svc.getTask(req.params.exerciseId)); } catch (e) { next(e); }
});

router.post('/submit', async (req, res, next) => {
  try {
    const { exercise_id, task_id, body } = req.body;
    res.status(201).json(await svc.submit(req.user!.userId, exercise_id, task_id, body));
  } catch (e) { next(e); }
});

router.get('/submissions', async (req, res, next) => {
  try { res.json(await svc.getUserSubmissions(req.user!.userId)); } catch (e) { next(e); }
});

router.get('/submissions/:id', async (req, res, next) => {
  try { res.json(await svc.getSubmission(req.user!.userId, req.params.id)); } catch (e) { next(e); }
});

export default router;
