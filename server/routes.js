const auth = require('./auth')
const users = require('./users')

module.exports = (app) => {
    app.use('/api', auth)
    app.use('/api', users)

    app.all('/api/*', (req, res) => {
        res.status(404).send('API Not Found')
    })
}
