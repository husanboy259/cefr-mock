import { Router } from 'express';
import { validate } from '../../middleware/validate';
import { authenticate } from '../../middleware/authenticate';
import { registerSchema, loginSchema } from './auth.schema';
import * as ctrl from './auth.controller';

const router = Router();

router.post('/register', validate(registerSchema), ctrl.registerCtrl);
router.post('/login', validate(loginSchema), ctrl.loginCtrl);
router.post('/refresh', ctrl.refreshCtrl);
router.post('/logout', ctrl.logoutCtrl);
router.get('/me', authenticate, ctrl.getMeCtrl);

export default router;
