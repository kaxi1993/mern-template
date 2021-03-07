const { Router } = require('express');

const { logIn, forgot, reset, requireLogin, requireAuth, checkStatus } = require('./auth.controllers');

const { validateAuth, validateForgot, validateReset } = require('./auth.validations');

const router = Router();

router.get('/status', requireAuth, checkStatus);
router.post('/login', validateAuth, requireLogin, logIn);
router.post('/forgot', validateForgot, forgot);
router.post('/reset', validateReset, reset);

module.exports = router;
