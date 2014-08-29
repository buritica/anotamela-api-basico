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
var Nota = require('./model');

/**
 * Verbs
 */

app.get('/notas', function(req, res) {
  console.log('get notas');

  Nota.find({}).exec()
    .then(function(notas) {

      var notasFixed = notas.map(function(nota) {
        return nota.toJSON();
      });

      res
        .status(200)
        .set('Content-Type','application/json')
        .json({
          notas: notasFixed
        });
    }, function(err) {
        console.log('err', err);
    })
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

    // save to storage
    Nota.create(notaNueva)
      .then(function(nota) {
        // response
        res
          .status(201)
          .json({
            nota: nota.toJSON()
          });
      });

  })

  // GET /notas
  .get(function(req, res, next) {
    var id = req.params.id;

    if (!id) {
      console.log('no param');
      return next();
    }

    Nota.findById(id, function(err, nota) {
      if (!nota) {
        return res
          .status(400)
          .send({});
      }

      res.json({
        notas: nota
      })
    });

  })

  // PUT
  .put(function(req, res, next) {
    var id = req.params.id;
    var notaActualizada = req.body.nota;

    if (!id) {
      return next();
    }

    Nota.update({_id:id}, notaActualizada, function(err, nota, results) {
      console.log(arguments);
      // response
      if (results.ok) {
       return res
          .json({
            nota: [notaActualizada]
          });
      }
      res
        .status(500)
        .send(err);

    });

  })

  // DELETE
  .delete(function(req, res) {
    var id = req.params.id;

    if (!id) {
      return next();
    }

    Nota.remove({_id:id}, function() {
      res
        .status(204)
        .send();
    });
  });



module.exports = app;