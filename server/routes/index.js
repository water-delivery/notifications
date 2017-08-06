const pubsub = require('./pubsub');
const logger = require('./logger');

const prefix = '/notification/v1/';
module.exports = (app) => {
  app.use(prefix, pubsub);
  app.use(prefix, logger);
};
