import { Router } from 'express';

import { requireAuth } from '../auth/auth.controllers.js';
import { validateCreateTask, validateUpdateTask } from './task.validations.js';
import { getTasks, createTask, updateTask, deleteTask } from './task.controllers.js';

const router = Router();

router.get('/tasks', requireAuth, getTasks);
router.post('/tasks', requireAuth, validateCreateTask, createTask);
router.put('/tasks/:id', requireAuth, validateUpdateTask, updateTask);
router.delete('/tasks/:id', requireAuth, deleteTask);

export default router;
