const LocalStrategy = require('passport-local')
const {
    Strategy,
    ExtractJwt
} = require('passport-jwt')

const User = require('../users/user-model')

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: process.env.JWT_SECRET
}

const jwtLogin = new Strategy(jwtOptions, async (payload, done) => {
    try {
        const user = await User.findById(payload.sub)

        if (!user) {
            return done(null, false)
        }

        if (!payload.exp || payload.exp <= Date.now()) {
            return done(null, false, {
                message: 'Token has expired'
            })
        }

        done(null, user)
    } catch (e) {
        done(e, false)
    }
})

const localLogin = new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    const message = 'Incorrect email or password'

    try {
        const user = await User.findOne({
            email
        })

        if (!user) {
            return done(null, false, {
                message
            })
        }

        user.comparePassword(password, (error, isMatch) => {
            if (error) {
                return done(error, false)
            }

            if (!isMatch) {
                return done(null, false, {
                    message
                })
            }

            return done(null, user)
        })
    } catch (e) {
        done(e, false)
    }
})

module.exports = {
    jwtLogin,
    localLogin
}
