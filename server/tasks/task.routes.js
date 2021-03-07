const { Router } = require('express');

const { requireAuth } = require('../auth/auth.controllers');

const { validateCreateTask, validateUpdateTask } = require('./task.validations');

const { getTasks, createTask, updateTask, deleteTask } = require('./task.controllers');

const router = Router();

router.get('/tasks', requireAuth, getTasks);
router.post('/tasks', requireAuth, validateCreateTask, createTask);
router.put('/tasks/:id', requireAuth, validateUpdateTask, updateTask);
router.delete('/tasks/:id', requireAuth, deleteTask);

module.exports = router;
