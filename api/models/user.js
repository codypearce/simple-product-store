const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator')
const jwt = require('jsonwebtoken')

var userSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minLength: 1,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        require: true,
        minLength: 4
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
})
// Override toJson method so we dont send the token or password back
userSchema.methos.toJSON = function () {
    var user = this
    var userObject = user.toObject()
    var newUserObj = {
        _id: userObject._id,
        email: userObject.email
    }
    return newUserObj
}

userSchema.methods.generateAuthToken = function () {
    var user = this
    var access = 'auth'
    var token = jwt.sign({_id: user._id.toHextString(), access}, 'test').toString()

    user.tokens.push({access, token})

    return user.save().then(() => {
        return token
    })
}

module.exports = mongoose.model('User', userSchema)
