const request = require('request');
const basicAuth = require('basic-auth');
const config = require('../config');
const constants = require('../constants');
const { getToken } = require('../utils');
const urls = require('../config').urls;

module.exports = (req, res, next) => {
  console.log('loadUser policy is running');
  req.options = req.options || {};

  // start with setting user to UNAUTHENTICATED
  req.options.user = { type: constants.USER_UNAUTHENTICATED };

  const auth = basicAuth(req) || {};
  const isServiceAccount =
    auth.name === config.credentials.basicAuth.username &&
    auth.pass === config.credentials.basicAuth.password;

  if (isServiceAccount) {
    req.options.user = {
      type: constants.USER_SERVICE_ACCOUNT,
    };
    return next();
  }

  const accessToken = getToken(req);
  // no accessToken and not a service account
  // go forward as UNAUTHENTICATED user
  if (!accessToken) return next();

  const authServiceReqOptions = {
    method: 'GET',
    url: `${urls.api}/auth/v1/user/me`,
    headers: { Authorization: `Bearer ${accessToken}` },
    json: true
  };

  return request(authServiceReqOptions, (err, response, body) => {
    const errorMessage = err || (response && response.body);
    const statusCode = (response && response.statusCode) || 500;

    if (err || statusCode !== 200) {
      return res
        .status(statusCode)
        .json(errorMessage || { message: 'Request to auth-service failed' });
    }

    req.options.user = body;
    req.options.user.type = req.options.user.roles === 'admin'
     ? constants.USER_ADMIN
     : constants.USER_AUTHENTICATED;

    return next();
  });
};
