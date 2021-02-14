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

app.get('/user/:id', async (req, res) => {
  let user = db.collection("users").doc(`${req.params.id}`);
  let doc = await user.get();
  if (!doc.exists) {
    res.status(400).send({ error: "user not found!" });
  } else {
    res.status(200).send({ result: doc.data() });
  }
});

app.post('/createUser', async (req, res) => {
  console.log(req.body)
  if (!(('name' in req.body) && ('email' in req.body))){
    res.status(400).send({ error: "wrong body!" });
    return
  }

  try {
    const ref = await db
    .collection("users")
    .add({ name: req.body.name, email: req.body.email })
    console.log(`success: ${ref.id}`);
    res.status(200).send({ 
      result: { 
        id: ref.id,  
        name: req.body.name,
        email: req.body.email,
      } 
    });
  }catch(error) {
    console.log(`Error: ${error}`);
      res.status(400).send({ error: error });
  }
});

module.exports = app;
