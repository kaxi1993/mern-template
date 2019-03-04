const joi = require('joi')

const validateCreateTask = (req, res, next) => {
    const task = req.body

    const schema = joi.object().keys({
        title: joi.string().required()
    })

    const {
        error
    } = joi.validate(task, schema)

    if (!error) {
        return next()
    }

    const {
        message
    } = error.details[0]

    res.json({
        message,
        status: 'fail'
    })
}

const validateUpdateTask = (req, res, next) => {
    const task = req.body

    const schema = joi.object().keys({
        title: joi.string().required(),
        status: joi.string().required().allowOnly(['TODO', 'DONE'])
    })

    const {
        error
    } = joi.validate(task, schema)

    if (!error) {
        return next()
    }

    const {
        message
    } = error.details[0]

    res.json({
        message,
        status: 'fail'
    })
}

module.exports = {
    validateCreateTask,
    validateUpdateTask
}
