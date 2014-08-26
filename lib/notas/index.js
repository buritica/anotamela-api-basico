/**
 * Dependencies
 */
var app = require('express')();
var logger = require('../logger');

/**
 * Locals
 */
var db = {};

// Methods

// POST
app.post('/', function(req, res) {
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
app.get('/:id', function(req, res) {
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

module.exports = app;