const {
    Router
} = require('express')

const {
    requireAuth
} = require('../auth/auth-controller')

const {
    validateCreateTask,
    validateUpdateTask
} = require('./task-validation')

const {
    getTasks,
    createTask,
    updateTask,
    deleteTask
} = require('./task-controller')

const router = Router()

router.get('/tasks', requireAuth, getTasks)
router.post('/tasks', requireAuth, validateCreateTask, createTask)
router.put('/tasks/:id', requireAuth, validateUpdateTask, updateTask)
router.delete('/tasks/:id', requireAuth, deleteTask)

module.exports = router
