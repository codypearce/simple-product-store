const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

var userSchema = new Schema({
    local: {
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
    }

}, {
    timestamps: true
})

userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

userSchema.methods.validPassword = function (password) {
    console.log('test password')
    return bcrypt.compareSync(password, this.local.password)
}

module.exports = mongoose.model('User', userSchema)
