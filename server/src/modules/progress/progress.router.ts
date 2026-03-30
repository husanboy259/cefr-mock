import { Router } from 'express';
import { authenticate } from '../../middleware/authenticate';
import * as svc from './progress.service';

const router = Router();
router.use(authenticate);

router.get('/dashboard',  async (req, res, next) => { try { res.json(await svc.getDashboard(req.user!.userId));        } catch (e) { next(e); } });
router.get('/overview',   async (req, res, next) => { try { res.json(await svc.getLevelStats(req.user!.userId));       } catch (e) { next(e); } });
router.get('/exercises',  async (req, res, next) => { try { res.json(await svc.getExerciseProgress(req.user!.userId)); } catch (e) { next(e); } });
router.get('/activity',   async (req, res, next) => { try { res.json(await svc.getDailyActivity(req.user!.userId));    } catch (e) { next(e); } });

export default router;
