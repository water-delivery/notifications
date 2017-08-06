const constants = require('../constants');

module.exports = (req, res, next) => {
  if (req.options && req.options.user.type === constants.USER_ADMIN) return next();

  return res.unAuthorized(constants.AUTHENTICATION_NEEDED_AS_ADMIN);
};
