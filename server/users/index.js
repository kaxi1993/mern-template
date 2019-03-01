const {
    Router
} = require('express')

const {
    createUser
} = require('./user-controller')

const router = Router()

router.post('/users', createUser)

module.exports = router
