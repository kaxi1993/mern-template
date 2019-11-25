const mongoose = require('mongoose')
const signale = require('signale')

mongoose.Promise = Promise

const db = {
    connect: (url) => {
        mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        }, (err) => {
            if (err) {
                signale.fatal('Can\'t connect to mongoDB!', err)
            } else {
                signale.success('Successfully connected to mongoDB')
            }
        })
    }
}

module.exports = db
