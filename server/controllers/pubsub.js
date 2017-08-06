const PubSub = require('../models').pubsub;
const {
  TOKEN_STATES,
} = require('../constants');
const { fcm } = require('../services');

module.exports = {
  create: (req, res) => {
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
    const { state, contact, userId, deviceId } = req.body || {};
    if (!state || !TOKEN_STATES.includes(state)) {
      return res.badRequest({
        message: `state should be one of these${TOKEN_STATES.toString()}`
      });
    }
    return PubSub.update({
      state
    }, {
      where: { deviceId, contact, userId },
      returning: true,
      plain: true
    })
    .then(res.ok)
    .catch(res.negotitate);
  },

  sendToDevice: (req, res) => {
    const payload = req.body.payload || {
      notification: {
        title: '$GOOG up 1.43% on the day',
        body: '$GOOG gained 11.80 points to close at 835.67, up 1.43% on the day.'
      },
      data: {
        stock: 'GOOG',
        open: 829.62,
        close: '635.67'
      }
    };
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
      });
    })
    .catch();
  },
};
