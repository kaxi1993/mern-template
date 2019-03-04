const auth = require('./auth')
const users = require('./users')
const tasks = require('./tasks')

module.exports = (app) => {
    app.use('/api', auth)
    app.use('/api', users)
    app.use('/api', tasks)

    app.all('/api/*', (req, res) => {
        res.status(404).send('API Not Found')
    })
}
