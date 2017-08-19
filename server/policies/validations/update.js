module.exports = (req, res, next) => {
  console.log('Update validation is running');
  const { deviceId } = req.body || {};
  if (!deviceId) {
    return res.status(400).send({
      message: 'Required field `deviceId` is not sent.'
    });
  }
  return next();
};
