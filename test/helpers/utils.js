var request = require('supertest-as-promised');
var api = require('../../server.js');
// var host = process.env.API_TEST_HOST || api;
var host = 'http://localhost:4200/api';
request = request(host);

module.exports.createNote = function createNote(note){
  console.log('createNote');
  var sample = {
    "nota": {
      "title": "Mejorando.la #node-pro",
      "description": "Introduccion a clase",
      "type": "js",
      "body": "soy el cuerpo de json"
    }
  };

  note = note || sample;

  return request
    .post('/notas')
    .set('Accept', 'application/json')
    .send(note)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  .then(function getNota(res) {
    this.note = res.body.nota;
    this.id = res.body.nota.id;
  }.bind(this));
}