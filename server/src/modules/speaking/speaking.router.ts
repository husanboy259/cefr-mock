import { Router } from 'express';
import path from 'path';
import { authenticate } from '../../middleware/authenticate';
import { uploadSpeaking } from '../../config/multer';
import * as svc from './speaking.service';

const router = Router();
router.use(authenticate);

router.get('/:exerciseId/task', async (req, res, next) => {
  try { res.json(await svc.getTask(req.params.exerciseId)); } catch (e) { next(e); }
});

router.post('/submit', uploadSpeaking.single('audio'), async (req, res, next) => {
  try {
    if (!req.file) { res.status(400).json({ error: 'Audio file required' }); return; }
    const { exercise_id, task_id, duration_sec } = req.body;
    // Store relative path as URL
    const audioUrl = `/uploads/speaking/${req.user!.userId}/${req.file.filename}`;
    const sub = await svc.submit(
      req.user!.userId, exercise_id, task_id,
      audioUrl, Number(duration_sec) || undefined, req.file.size,
    );
    res.status(201).json(sub);
  } catch (e) { next(e); }
});

router.get('/submissions', async (req, res, next) => {
  try { res.json(await svc.getUserSubmissions(req.user!.userId)); } catch (e) { next(e); }
});

router.get('/submissions/:id', async (req, res, next) => {
  try { res.json(await svc.getSubmission(req.user!.userId, req.params.id)); } catch (e) { next(e); }
});

export default router;
