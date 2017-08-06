const admin = require('firebase-admin');
const serviceAccount = require('../../credentials/firebase.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DB_URL || 'https://arkraiders-23f7f.firebaseio.com'
});

module.exports = admin;
