/**
 * Module dependencies
 */
var express = require('express');
var logger = require('./lib/logger');
var bodyParser = require('body-parser');

/**
 * Locals
 */
var app = module.exports = express();
var port = process.env.PORT || 3000;
var db = {};

// parse json requests
app.use(bodyParser.json('application/json'));

/**
 * Routes
 */

// POST
app.post('/notas', function(req, res) {
  logger.info('POST', req.body);

  // manipulate request
  var notaNueva = req.body.nota;
  notaNueva.id = Date.now();

  // save to storage
  db[notaNueva.id] = notaNueva;

  // prepare response
  res.set('Content-Type','application/json');
  res.status(201);

  // send response
  res.json({
    nota: db[notaNueva.id]
  });
});

// GET
app.get('/notas/:id', function(req, res) {
  logger.info('GET /notas/%s', req.params.id);

  var id = req.params.id;
  var nota = db[id];

  if (!nota) {
    res.status(404);
    return res.send('Not found');
  }

  res.json({
    notas: nota
  })
});

/**
 * Start server if we're not someone else's dependency
 */
if (!module.parent) {
  app.listen(port, function() {
    logger.info('Anotamela API Básico escuchando en http://localhost:%s/', port);
  });
}