const admin = require('../config').firebase;

module.exports = {

  sendToDevice: (params) => admin.messaging()
    .sendToDevice(params.registrationToken, params.payload),

  sendToGroup: () => new Promise((resolve, reject) => {

  }),
};
