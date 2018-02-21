const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

var userSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minLength: 1,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 4
    }
}, {
    timestamps: true
})

// generating a hash
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

// checking if password is valid
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password)
}

// create the model for users and expose it to our app

module.exports = mongoose.model('User', userSchema)
