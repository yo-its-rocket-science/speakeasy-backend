var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://driven-origin-304722-default-rtdb.firebaseio.com" 
});

db = admin.firestore();

module.exports = db