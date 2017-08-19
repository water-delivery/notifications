const express = require('express');

const router = express.Router();
const {
  loadUser,
  isServiceAccount,
  validations,
} = require('../policies');
const pubsubController = require('../controllers/pubsub');

/* register token */
router.post('/pubsub', loadUser, isServiceAccount, validations.create, pubsubController.create);

/* register token */
router.post('/notify', loadUser, isServiceAccount, pubsubController.sendToDevice);

/* user logged out  */
router.put('/pubsub', pubsubController.update);

module.exports = router;
