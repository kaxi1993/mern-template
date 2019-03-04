const {
    Router
} = require('express')

const {
    createUser
} = require('./user-controller')

const {
    validateCreateUser
} = require('./user-validation')

const router = Router()

router.post('/users', validateCreateUser, createUser)

module.exports = router
