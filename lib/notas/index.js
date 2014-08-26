/**
 * Dependencies
 */
var app = require('express')();
var logger = require('../logger');

/**
 * Locals
 */
var db = {};

/**
 * Verbs
 */

app.route('/notas/:id?')

  .all(function(req, res, next) {
    logger.info(req.method, req.path, req.body);
    res.set('Content-Type','application/json');
    next();
  })

  // POST
  .post(function(req, res) {

    // manipulate request
    var notaNueva = req.body.nota;
    notaNueva.id = Date.now();

    // save to storage
    db[notaNueva.id] = notaNueva;

    // response
    res
      .status(201)
      .json({
        nota: db[notaNueva.id]
      });
  })

  // GET
  .get(function(req, res, next) {
    var id = req.params.id;

    if (!id) {
      return next();
    }

    var nota = db[id];

    if (!nota) {
      return res
        .status(400)
        .send({});
    }

    res.json({
      notas: nota
    })
  })

  // PUT
  .put(function(req, res, next) {
    var id = req.params.id;

    if (!id) {
      return next();
    }

    var notaActualizada = req.body.nota;

    db[id] = notaActualizada;

    // response
    res
      .json({
        nota: [db[id]]
      });
  });

module.exports = app;