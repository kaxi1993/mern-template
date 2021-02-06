const signale = require('signale')

const User = require('./user-model')

const createUser = async (req, res) => {
    const newUser = req.body

    try {
        const user = await User.findOne({
            email: newUser.email
        })

        if (user) {
            return res.json({
                message: 'User with this email address already exists',
                status: 'fail',
                field: 'email'
            })
        }

        const {
            _id
        } = await new User(newUser).save()

        res.json({
            _id,
            status: 'ok'
        })
    } catch (e) {
        signale.fatal('Error occurred in createUser', e)

        res.status(500).send('Internal server error')
    }
}

module.exports = {
    createUser
}
