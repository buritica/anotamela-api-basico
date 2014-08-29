var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NotaSchema = new Schema({
  title: String,
  description: String,
  type: String,
  body: String
});

NotaSchema.set('toJSON', {
     transform: function (doc, ret, options) {
         ret.id = ret._id;
         delete ret._id;
         delete ret.__v;
     }
});

var model = mongoose.model('notas', NotaSchema);

module.exports = model;