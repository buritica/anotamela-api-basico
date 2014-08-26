var winston = require('winston');

 module.exports = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      colorize: true,
      prettyPrint: true,
      level: 'debug',
      label: 'anotamela-api'
    })
  ]
});
