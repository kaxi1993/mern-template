const {
    Router
} = require('express')

const {
    logIn,
    requireLogin
} = require('./auth-controller')

const {
    validateAuth
} = require('./auth-validation')

const router = Router()

router.post('/login', validateAuth, requireLogin, logIn)

module.exports = router
