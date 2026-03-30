import { Router } from 'express';
import { authenticate } from '../../middleware/authenticate';
import * as ctrl from './exercises.controller';

const router = Router();

router.get('/', ctrl.list);
router.get('/bookmarked', authenticate, ctrl.getBookmarks);
router.get('/:id', ctrl.detail);
router.get('/:id/content', authenticate, ctrl.content);
router.post('/:id/bookmark', authenticate, ctrl.bookmark);
router.delete('/:id/bookmark', authenticate, ctrl.bookmark);

export default router;
