var mongoose = require('mongoose')

// Set up Database
mongoose.connection.openUri('mongodb://localhost/simple-product-store')

module.exports = {mongoose}
