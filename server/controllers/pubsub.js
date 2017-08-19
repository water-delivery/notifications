const PubSub = require('../models').pubsub;
const {
  TOKEN_STATES,
} = require('../constants');
const { fcm } = require('../services');
const utils = require('../utils');

module.exports = {
  create: (req, res) => {
    console.log('Creating subscription!!');
    const { deviceId, token, userId, state, contact } = req.body || {};

    PubSub.findOrCreate({
      where: {
        token,
        deviceId
      },
      defaults: {
        userId,
        deviceId,
        token,
        state,
        contact
      }
    })
    .spread((record, created) => {
      if (created) console.log('New user subscribed!!');
      return res.ok(record);
    });
  },

  update: (req, res) => {
    console.log('Updating subscription!!');
    const { status, deviceId } = req.body || {};
    if (!status || !TOKEN_STATES.includes(status)) {
      return res.badRequest({
        message: `state should be one of these ${TOKEN_STATES.toString()}`
      });
    }

    // TODO: change this to upsert if possible
    return PubSub.update({
      status
    }, {
      where: { deviceId },
      returning: true,
      plain: true
    })
    .then(([, affectedRows]) => {
      return res.ok({
        message: `Updated ${affectedRows} records`
      });
    })
    // .then(res.ok)
    .catch(res.negotitate);
  },

  sendToDevice: (req, res) => {
    const action = req.body.action || 'orderPlaced';
    if (!action || !utils[action]) {
      return res.badRequest({
        message: 'Required field action not sent or invalid'
      });
    }
    const payload = utils[action]();

    const { userId, deviceId } = req.body || {};
    if (!userId || !deviceId) {
      return res.badRequest({
        message: 'Required fields `userId` or `deviceId` not sent.'
      });
    }
    return PubSub.findOne({
      where: {
        deviceId,
        userId
      }
    })
    .then(record => {
      if (!record) return res.ok({ message: 'Did not subscribe for notifications' });
      return fcm.sendToDevice({
        registrationToken: record.token,
        payload
      })
      .then(res.ok)
      .catch(res.negotitate);
    })
    .catch(res.negotitate);
  },
};
