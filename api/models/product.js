var mongoose = require('mongoose')
var Schema = mongoose.Schema

var productSchema = new Schema({
    title: {type: String, required: true, trim: true},
    description: {type: String, required: true},
    slug: {type: String, unique: true, required: true, trim: true},
    externalLink: {type: String, trim: true},
    price: {type: Number, required: true},
    imgLink: {type: String},
    categories: {type: [String]}
}, {
    timestamps: true
})

module.exports = mongoose.model('Product', productSchema)
