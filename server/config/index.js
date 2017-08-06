const firebase = require('./firebase');
const plivo = require('./plivo');
const connections = require('./connections');

module.exports = {
  connections,
  firebase,
  plivo,
  credentials: {
    basicAuth: {
      username: 'arkraiders',
      password: process.env.BASIC_AUTH_PASSWORD || 'notification'
    }
  }
};
