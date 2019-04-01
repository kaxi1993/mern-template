const mongoose = require('mongoose')

const {
    Schema
} = mongoose

const taskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'TODO',
        enum: ['TODO', 'DONE'],
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

function preUpdate () {
    this.update({}, {
        $set: {
            updatedAt: new Date()
        }
    })
}

taskSchema.methods.preUpdate = preUpdate

taskSchema.pre('update', preUpdate)

const Task = mongoose.model('Task', taskSchema)

module.exports = Task
