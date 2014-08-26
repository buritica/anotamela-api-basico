/**
 * Dependencies
 */
var app = require('express')();
var logger = require('../logger');
var _ = require('lodash');

/**
 * Locals
 */
var db = {};

/**
 * Verbs
 */

app.get('/notas', function(req, res) {
  var notas = _.values(db);

  res
    .status(200)
    .set('Content-Type','application/json')
    .json({
      notas: notas
    });
});

app.route('/notas/:id?')

  .all(function(req, res, next) {
    console.log(req.method, req.path, req.body);
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

  // GET /notas
  .get(function(req, res, next) {
    var id = req.params.id;

    if (!id) {
      console.log('no param');
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
    notaActualizada.id = id;

    db[id] = notaActualizada;

    // response
    res
      .json({
        nota: [db[id]]
      });
  })

  // DELETE
  .delete(function(req, res) {
    var id = req.params.id;

    if (!id) {
      return next();
    }

    delete db[id];

    res
      .status(204)
      .send();
  });



module.exports = app;