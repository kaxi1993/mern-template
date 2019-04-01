const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')

const {
    Schema
} = mongoose

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index: {
            unique: true
        }
    },
    password: {
        type: String,
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

function comparePassword (candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) {
            return callback(err)
        }

        callback(null, isMatch)
    })
}

function preSave (next) {
    const user = this

    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err)
        }

        const hash = bcrypt.hashSync(user.password, salt)
        user.password = hash

        next()
    })
}

function preUpdate () {
    this.update({}, {
        $set: {
            updatedAt: new Date()
        }
    })
}

userSchema.methods.comparePassword = comparePassword
userSchema.methods.preSave = preSave
userSchema.methods.preUpdate = preUpdate

userSchema.pre('save', preSave)
userSchema.pre('update', preUpdate)

const User = mongoose.model('User', userSchema)

module.exports = User
