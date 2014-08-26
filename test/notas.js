var request = require('supertest');
var api = require('../server.js');
var host = process.env.API_TEST_HOST || api;
var logger = require('../lib/logger');

request = request(host);

describe('Coleccion de Notas [/notas]', function() {

  describe('POST', function() {
    it('deberia crear una nota', function(done) {
      var data = {
        "nota": {
          "title": "Mejorando.la #node-pro",
          "description": "Introduccion a clase",
          "type": "js",
          "body": "soy el cuerpo de json"
        }
      };

      request
        .post('/notas')
        .send(data)
        .expect(201)
        .expect('Content-Type', /application\/json/)
        .end(function(err, res) {
          var nota;
          var linked;

          var body = JSON.parse(res.text);
          logger.log(body);

          // Nota existe
          expect(body).to.have.property('nota');
          nota = body.nota;

          // Propiedades
          expect(nota).to.have.property('title', 'Mejorando.la #node-pro');
          expect(nota).to.have.property('description', 'Introduccion a clase');
          expect(nota).to.have.property('type', 'js');
          expect(nota).to.have.property('body', 'soy el cuerpo de json');
          expect(nota).to.have.property('id');

          done(err);
        });
    });
  });

});