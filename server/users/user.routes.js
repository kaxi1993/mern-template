import { Router } from 'express';

import { createUser } from './user.controllers.js';
import { validateCreateUser } from './user.validations.js';

const router = Router();

router.post('/users', validateCreateUser, createUser);

module.exports = router;
