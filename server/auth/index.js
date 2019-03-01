const {
    Router
} = require('express')
const {
    logIn,
    requireLogin
} = require('./auth-controller')

const router = Router()

router.post('/login', requireLogin, logIn)

module.exports = router
