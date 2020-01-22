const mongoose = require('mongoose')

const {
    Schema
} = mongoose

const weatherSchema = new Schema({
    sessionId: {
        type: String,
        index: true,
        required: true
    },
    city: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Task = mongoose.model('Weather', weatherSchema)

module.exports = Task
