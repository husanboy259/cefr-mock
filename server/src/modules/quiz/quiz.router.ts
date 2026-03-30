import { Router } from 'express';
import { authenticate } from '../../middleware/authenticate';
import * as svc from './quiz.service';

const router = Router();

router.use(authenticate);

router.post('/start', async (req, res, next) => {
  try {
    res.status(201).json(await svc.startAttempt(req.user!.userId, req.body.exercise_id));
  } catch (err) { next(err); }
});

router.post('/:id/answer', async (req, res, next) => {
  try {
    const { question_id, option_id, text_answer } = req.body;
    res.json(await svc.submitAnswer(req.user!.userId, req.params.id, question_id, option_id, text_answer));
  } catch (err) { next(err); }
});

router.post('/:id/submit', async (req, res, next) => {
  try {
    res.json(await svc.submitAttempt(req.user!.userId, req.params.id));
  } catch (err) { next(err); }
});

router.get('/history', async (req, res, next) => {
  try {
    res.json(await svc.getHistory(req.user!.userId));
  } catch (err) { next(err); }
});

router.get('/:id/result', async (req, res, next) => {
  try {
    res.json(await svc.getResult(req.user!.userId, req.params.id));
  } catch (err) { next(err); }
});

export default router;
