const {
    Router
} = require('express')

const {
    logIn,
    forgot,
    requireLogin,
    requireAuth,
    checkStatus
} = require('./auth-controller')

const {
    validateAuth,
    validateForgot
} = require('./auth-validation')

const router = Router()

router.get('/status', requireAuth, checkStatus)
router.post('/login', validateAuth, requireLogin, logIn)
router.post('/forgot', validateForgot, forgot)

module.exports = router
