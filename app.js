const express = require('express'),
      app = express(),
      methodOverride = require('method-override'),
      bodyParser = require('body-parser'),
      morgan = require('morgan'),
      mongoose = require('mongoose');


mongoose.connection.openUri('mongodb://localhost/simple-product-store');


app.use(express.static(__dirname + '/client'));


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

app.set('view engine', 'pug');

// routes
app.use(require('./api/routes'))

const port = 3000;
app.listen(port);
// app.listen(process.env.PORT, process.env.IP);
console.log('Now Listening on port: ' + port);
