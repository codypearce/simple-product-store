let mongoose = require('mongoose')
const config = require('../config/config')
// Set up Database

let mongoURI
if (process.env.NODE_ENV === 'dev') {
    mongoURI = config.mongoURI.dev
} else {
    mongoURI = config.mongoURI.test
}
mongoose.connection.openUri(mongoURI)

module.exports = {mongoose}
