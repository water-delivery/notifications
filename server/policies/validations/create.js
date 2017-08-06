module.exports = (req, res, next) => {
  console.log('Create validation is running');
  const { registrationToken, userId } = req.body || {};
  if (!registrationToken) {
    return res.status(400).send({
      message: 'Required field `registrationToken` is not sent.'
    });
  }

  return next();
};
