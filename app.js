var env = process.env.NODE_ENV || 'development'

const express = require('express'),
    app = express(),
    methodOverride = require('method-override'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    path = require('path'),
    flash = require('connect-flash'),
    session = require('express-session'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    cookieParser = require('cookie-parser'),
    mongoose = require('./api/db/mongoose')

// Static File
app.use(express.static(`${__dirname}/client`))

// Loggging
if (process.env.NODE_ENV === 'dev') {
    app.use(morgan('dev'))
}

// Body Parser
app.use(bodyParser.urlencoded({'extended': 'true'}))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))
app.use(methodOverride())

app.use(session({
    secret: 'thisismysecret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))
app.use(flash())

// Passport init
app.use(passport.initialize())
app.use(passport.session())
require('./api/config/passport')(passport)
app.use(function (req, res, next) {
    res.locals.login = req.isAuthenticated()
    res.locals.user = req.user
    next()
})
// Seed data
require('./api/db/seedData')

// View Engine
app.set('view engine', 'pug')

// Route
require('./api/routes')(app, passport)

const port = process.env.PORT || 3000
app.listen(port)
console.log('Now Listening on port: ' + port)

module.exports = {app}
