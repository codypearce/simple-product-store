var mongoose = require('mongoose')
var Schema = mongoose.Schema

var settingSchema = new Schema({
    humanName: {type: String, required: true, trim: true},
    name: {type: String, required: true, trim: true, unique: true},
    value: {type: Number, required: true}

}, {
    timestamps: true
})

module.exports = mongoose.model('Setting', settingSchema)
