const { Router } = require('express');

const { createUser } = require('./user.controllers');

const { validateCreateUser } = require('./user.validations');

const router = Router();

router.post('/users', validateCreateUser, createUser);

module.exports = router;
