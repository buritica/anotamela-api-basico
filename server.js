/**
 * Module dependencies
 */
var express = require('express');
var logger = require('./lib/logger');

/**
 * Locals
 */
var app = module.exports = express();
var port = process.env.PORT || 3000;

/**
 * Start server if we're not someone else's dependency
 */
if (!module.parent) {
  app.listen(port, function() {
    logger.info('Anotamela API Básico escuchando en http://localhost:%s/', port);
  });
}