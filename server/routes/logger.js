const express = require('express');

const router = express.Router();
const {
  isServiceAccount
} = require('../policies');
const loggerController = require('../controllers/logger');

/* log errors */
router.post('/logger/crash', isServiceAccount, loggerController.crash);

module.exports = router;
