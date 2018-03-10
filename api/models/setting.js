var mongoose = require('mongoose')
var Schema = mongoose.Schema

var settingSchema = new Schema({
    name: {type: String, required: true, trim: true},
    value: {type: Number, required: true}

}, {
    timestamps: true
})

module.exports = mongoose.model('Setting', settingSchema)
