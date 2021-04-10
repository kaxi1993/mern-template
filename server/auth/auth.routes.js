import { Router } from 'express';

import { logIn, forgot, reset, requireLogin, requireAuth, checkStatus } from './auth.controllers.js';
import { validateAuth, validateForgot, validateReset } from './auth.validations.js';

const router = Router();

router.get('/status', requireAuth, checkStatus);
router.post('/login', validateAuth, requireLogin, logIn);
router.post('/forgot', validateForgot, forgot);
router.post('/reset', validateReset, reset);

export default router;
