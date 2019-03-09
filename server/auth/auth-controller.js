const jwt = require('jwt-simple')
const passport = require('passport')
const signale = require('signale')

const User = require('../users/user-model')

const tokenizeUser = (user) => {
    const sub = user._id
    const iat = Date.now()
    const exp = Date.now() + Number(process.env.AUTH_EXPIRES_IN)

    return jwt.encode({
        sub,
        iat,
        exp
    }, process.env.JWT_SECRET)
}

const requireAuth = passport.authenticate('jwt', {
    session: false
})

const requireLogin = (req, res, next) => {
    passport.authenticate('local', {
        session: false
    }, (err, user, info) => {
        const {
            email,
            password
        } = req.body

        if (err) {
            return next(err)
        }

        if (!email) {
            return res.json({
                message: 'Email required',
                status: 'fail',
                field: 'email'
            })
        }

        if (!password) {
            return res.json({
                message: 'Password required',
                status: 'fail',
                field: 'password'
            })
        }

        if (!user) {
            return res.json({
                message: info.message,
                status: 'fail'
            })
        }

        req.logIn(user, (error) => {
            if (error) {
                return next(error)
            }

            return next()
        })
    })(req, res, next)
}

const logIn = async (req, res) => {
    const {
        email
    } = req.body

    try {
        const user = await User.findOne({
            email
        })

        const token = tokenizeUser(user)

        res.json({
            status: 'ok',
            token,
            user: {
                email,
                name: user.name
            }
        })
    } catch (e) {
        signale.fatal('Error occured in login', e)

        res.status(500).send('Internal server error', e)
    }
}

module.exports = {
    logIn,
    requireAuth,
    requireLogin
}
