const {
    Router
} = require('express')

const {
    logIn,
    requireLogin,
    requireAuth,
    checkStatus
} = require('./auth-controller')

const {
    validateAuth
} = require('./auth-validation')

const router = Router()

router.get('/status', requireAuth, checkStatus)
router.post('/login', validateAuth, requireLogin, logIn)

module.exports = router
