const express = require('express'),
    app = express(),
    methodOverride = require('method-override'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    mongoose = require('mongoose')

// Set up Database
mongoose.connection.openUri('mongodb://localhost/simple-product-store')

// Static File
app.use(express.static(`${__dirname}/client`))

// Loggging
app.use(morgan('dev'))

// Body Parser
app.use(bodyParser.urlencoded({'extended': 'true'}))
app.use(bodyParser.json())
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))
app.use(methodOverride())

// View Engine
app.set('view engine', 'pug')

// Route
app.use(require('./api/routes'))

const port = process.env.PORT || 3000
app.listen(port)
console.log('Now Listening on port: ' + port)
