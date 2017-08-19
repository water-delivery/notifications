const async = require('async');
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
    const { status, deviceId, userType, userId, token } = req.body || {};
    if (!status || !TOKEN_STATES.includes(status)) {
      return res.badRequest({
        message: `state should be one of these ${TOKEN_STATES.toString()}`
      });
    }

    // TODO: change this to upsert if possible
    async.waterfall([
      // Find or create
      (cb) =>
        PubSub.findOrCreate({
          where: {
            deviceId
          },
          defaults: {
            userType,
            deviceId,
            status,
            token,
            userId
          }
        })
        .spread((record, created) => cb(null, created)),
      // update record if not created
      (created, cb) => {
        if (created) return cb();
        return PubSub.update({
          status
        }, {
          where: { deviceId },
          returning: true,
          plain: true
        })
        .then(([, affectedRows]) =>
          cb(null, {
            message: `Updated ${affectedRows} records`
          })
        )
        .catch(cb);
      }
    ], (err, result) => {
      if (err) return res.negotitate(err);
      return res.ok(result);
    });
  },

  sendToDevice: (req, res) => {
    const action = req.body.action || 'orderPlaced';
    const { meta } = req.body;
    if (!action || !utils[action]) {
      return res.badRequest({
        message: 'Required field action not sent or invalid'
      });
    }
    const payload = utils[action](meta);

    const { userId, userType, deviceId } = req.body || {};
    if (!userId || !deviceId) {
      return res.badRequest({
        message: 'Required fields `userId` or `deviceId` not sent.'
      });
    }
    let where = {};
    if (userId && userType) where = { userId, userType };
    if (deviceId) where = { deviceId };
    if (Object.keys(where).length < 1) {
      return res.badRequest({
        message: 'userId or deviceId is needed to send notification'
      });
    }
    return PubSub.findOne({
      where
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
