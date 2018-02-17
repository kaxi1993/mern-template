const mongoose = require('mongoose')

mongoose.Promise = Promise

const db = {
    connect: (url) => {
        mongoose.connect(url, (err) => {
            if (err) {
                console.error('Can\'t connect to mongoDB!', err)
            } else {
                console.info('Successfully connected to mongoDB')
            }
        })
    }
}

module.exports = db
