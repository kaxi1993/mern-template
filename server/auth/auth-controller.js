const jwt = require('jwt-simple')
const passport = require('passport')
const signale = require('signale')

const User = require('../users/user-model')
const {
    sendEmail
} = require('./auth-service')

const tokenize = (sub) => {
    const iat = Date.now()
    const exp = iat + Number(process.env.AUTH_EXPIRES_IN)

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
        if (err) {
            return next(err)
        }

        if (!user) {
            return res.json({
                message: info.message,
                status: 'fail'
            })
        }

        next()
    })(req, res, next)
}

const checkStatus = (req, res) => res.json({
    isAuthenticated: req.isAuthenticated()
})

const logIn = async (req, res) => {
    const {
        email
    } = req.body

    try {
        const user = await User.findOne({
            email
        })

        const token = tokenize(user._id)

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

        res.status(500).send('Internal server error')
    }
}

const forgot = async (req, res) => {
    const {
        email
    } = req.body

    try {
        const user = await User.findOne({
            email
        })

        if (!user) {
            return res.json({
                message: 'User with this email address not found',
                status: 'fail',
                field: 'email'
            })
        }

        const token = tokenize(email)

        await sendEmail(email, token)

        res.json({
            status: 'ok',
            message: 'Instruction for resetting your password has been sent to your email address'
        })
    } catch (e) {
        signale.fatal('Error occured in forgot', e)

        res.status(500).send('Internal server error')
    }
}

const reset = async (req, res) => {
    const {
        password,
        token
    } = req.body

    let email

    try {
        const {
            sub,
            exp
        } = jwt.decode(token, process.env.JWT_SECRET)

        if (exp <= Date.now()) {
            return res.json({
                message: 'Password reset token expired',
                status: 'fail'
            })
        }

        email = sub
    } catch (e) {
        return res.json({
            message: 'Password reset token invalid',
            status: 'fail'
        })
    }

    try {
        const user = await User.findOne({
            email
        })

        user.password = password

        await user.save()

        const authToken = tokenize(user._id)

        res.json({
            status: 'ok',
            token: authToken,
            user: {
                email,
                name: user.name
            }
        })
    } catch (e) {
        signale.fatal('Error occured in reset', e)

        res.status(500).send('Internal server error')
    }
}

module.exports = {
    tokenize,
    requireAuth,
    requireLogin,
    checkStatus,
    logIn,
    forgot,
    reset
}
