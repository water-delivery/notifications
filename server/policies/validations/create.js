module.exports = (req, res, next) => {
  console.log('Create validation is running');
  const { token, userId } = req.body || {};
  if (!token) {
    return res.status(400).send({
      message: 'Required field `token` is not sent.'
    });
  }

  return next();
};
