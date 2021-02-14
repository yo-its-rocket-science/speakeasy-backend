const firebase = require('firebase');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

require('dotenv').config();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://driven-origin-304722-default-rtdb.firebaseio.com'
});

const firebaseConfig = {
  apiKey: process.env.fireApiKey,
  authDomain: 'driven-origin-304722.firebaseapp.com',
  databaseURL: process.env.databaseURL,
  projectId: 'driven-origin-304722',
  storageBucket: 'driven-origin-304722.appspot.com',
  messagingSenderId: '705209892042',
  appId: '1:705209892042:web:a1f7366d29e741ced5c833',
  measurementId: 'G-LHG2R6BPRL'
};

const db = admin.firestore();
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

module.exports = {
  database: db,
  auth: auth
};
