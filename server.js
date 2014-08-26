/**
 * Module dependencies
 */
var express = require('express');
var logger = require('./lib/logger');
var bodyParser = require('body-parser');
var cors = require('cors');

/**
 * Locals
 */
var app = module.exports = express();
var port = process.env.PORT || 3000;

// parse json requests
app.use(bodyParser.json('application/json'));
app.use(cors());

/**
 * Routes
 */
var notas = require('./lib/notas');
app.use(notas);

/**
 * Start server if we're not someone else's dependency
 */
if (!module.parent) {
  app.listen(port, function() {
    logger.info('Anotamela API Básico escuchando en http://localhost:%s/', port);
  });
}