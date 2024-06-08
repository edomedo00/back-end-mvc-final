const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountsKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://final-lmp--ecommerce-default-rtdb.firebaseio.com"
});

const db = admin.firestore();

module.exports = admin