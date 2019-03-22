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

module.exports = {
    validateAuth,
    validateForgot
}
