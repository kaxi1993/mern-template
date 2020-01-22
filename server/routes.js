const auth = require('./auth')
const users = require('./users')
const tasks = require('./tasks')
const weather = require('./weather')

module.exports = (app) => {
    app.use('/api', auth)
    app.use('/api', users)
    app.use('/api', tasks)
    app.use('/api', weather)

    app.all('/api/*', (req, res) => {
        res.status(404).send('API Not Found')
    })
}
