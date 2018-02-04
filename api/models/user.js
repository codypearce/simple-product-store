const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

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
userSchema.methods.toJSON = function () {
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

userSchema.statics.findByToken = function (token) {
    var User = this
    var decoded

    try {
        decoded = jwt.verify(token, 'test')
    } catch (e) {
        return Promise.reject()
    }
    return User.findOne({
        _id: decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    })
}

userSchema.statics.findByCredentials = function (email, password) {
    var User = this

    return User.findOne({email}).then((user) => {
        if(!user) {
            return Promise.reject();
        }

        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                if(res) {
                    resolve(user)
                } else {
                    reject()
                }
            })
        })
    })
}

userSchema.pre('save', function (next) {
    var user = this;

    if(user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash
                next()
            })
        })
    } else {
        next()
    }
})

module.exports = mongoose.model('User', userSchema)
