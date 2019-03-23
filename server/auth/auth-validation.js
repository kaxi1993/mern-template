const joi = require('joi')

const validateAuth = (req, res, next) => {
    const {
        body
    } = req

    const schema = joi.object().keys({
        email: joi.string().email().required(),
        password: joi.string().required()
    })

    const {
        error
    } = joi.validate(body, schema)

    if (!error) {
        return next()
    }

    const {
        message,
        context
    } = error.details[0]

    res.json({
        message,
        status: 'fail',
        field: context.key
    })
}

const validateForgot = (req, res, next) => {
    const {
        body
    } = req

    const schema = joi.object().keys({
        email: joi.string().email().required()
    })

    const {
        error
    } = joi.validate(body, schema)

    if (!error) {
        return next()
    }

    const {
        message,
        context
    } = error.details[0]

    res.json({
        message,
        status: 'fail',
        field: context.key
    })
}

const validateReset = (req, res, next) => {
    const {
        password,
        rePassword,
        token
    } = req.body

    const schema = joi.object().keys({
        password: joi.string().min(6).required(),
        rePassword: joi.string().min(6).required(),
        token: joi.string().required()
    })

    const {
        error
    } = joi.validate({
        password,
        rePassword,
        token
    }, schema)

    if (error) {
        const {
            message,
            context
        } = error.details[0]

        res.json({
            message,
            status: 'fail',
            field: context.key
        })
    } else if (password !== rePassword) {
        res.json({
            message: 'Passwords don\'t match',
            status: 'fail',
            field: 'rePassword'
        })
    } else {
        return next()
    }
}

module.exports = {
    validateAuth,
    validateForgot,
    validateReset
}
