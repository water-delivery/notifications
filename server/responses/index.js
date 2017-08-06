const ok = require('./ok');
const created = require('./created');
const forbidden = require('./forbidden');
const negotiate = require('./negotiate');
const notFound = require('./notFound');
const noContent = require('./noContent');
const unAuthorized = require('./unAuthorized');
const serverError = require('./serverError');

module.exports = (req, res, next) => {
  res.ok = ok(res);
  res.created = created(res);
  res.forbidden = forbidden(res);
  res.negotiate = negotiate(res);
  res.noContent = noContent(res);
  res.notFound = notFound(res);
  res.unAuthorized = unAuthorized(res);
  res.serverError = serverError(res);
  next();
};
