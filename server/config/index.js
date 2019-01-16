const firebase = require('./firebase');
const plivo = require('./plivo');
const connections = require('./connections');
const urls = require('./urls');

module.exports = {
  connections,
  firebase,
  plivo,
  urls,
  credentials: {
    basicAuth: {
      username: 'arkraiders',
      password: process.env.BASIC_AUTH_PASSWORD || 'notification'
    }
  }
};
