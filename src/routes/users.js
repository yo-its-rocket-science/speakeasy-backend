const express = require('express');
const bodyParser = require('body-parser');
const app = express.Router();
const firebase = require('./../firebase/firebase');

const db = firebase.database;
const authenticator = firebase.auth;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send({ express: 'Welcome to SpeakEasy!' });
});

app.get('/users', async (req, res) => {
  let users = db.collection("users");
  let result = []
  let snapshot = await users.get();
  snapshot.forEach(doc => {
    console.log(doc.id, '=>', doc.data());
    result.push(doc.data())
  });

  res.status(200).send({ result: result });
});

module.exports = app;
