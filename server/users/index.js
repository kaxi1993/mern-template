const {
    Router
} = require('express')

const {
    createUser
} = require('./user-controller')

const {
    validateUser
} = require('./user-validations')

const router = Router()

router.post('/users', validateUser, createUser)

module.exports = router
