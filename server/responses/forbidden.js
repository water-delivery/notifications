module.exports = (res) => (data) => {
  const status = 403;

  return res.status(status).json(data);
};
