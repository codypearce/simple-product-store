var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema ({
    title: String,
    description: String,
    slug: {type: String, unique: true, required: true},
    img: String,
    price: Number,
    link: String,
},{
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
