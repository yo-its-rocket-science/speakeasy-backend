const express = require('express');
const bodyParser = require('body-parser');
const firebase = require('./../firebase/firebase');
const app = express.Router();

const db = firebase.database;
const authenticator = firebase.auth;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/getRooms', async (req, res) => {
  const rooms = db.collection('rooms');
  const result = [];
  const snapshot = await rooms.get();

  snapshot.forEach((doc) => {
    console.log(doc.id, '=>', doc.data());
    result.push(doc.data());
  });

  res.status(200).send({ result: result });
});

app.post('/addRoom', async (req, res) => {
  if (!(('roomName' in req.body) && ('roomDescription' in req.body))) {
    res.status(400).send({ error: 'body incorrect' });
    return;
  }

  try {
    const roomName = req.body.roomName;
    const roomDescription = req.body?.roomDescription;
    const room = await db
      .collection('rooms')
      .add({ name: roomName, description: roomDescription, isLive: false });

    console.log(`Added room ${room.id}`);
    res.status(200).send({
      result: {
        id: room.id,
        name: roomName,
        description: roomDescription,
        isLive: false
      }
    });
  } catch (error) {
    console.log(`error: ${error}`);
  }
});

app.post('/deleteRoom', async (req, res) => {
  if (!('roomID' in req.body)) {
    res.status(400).send({ error: 'body incorrect' });
    return;
  }

  try {
    const roomID = req.body.roomID;
    const room = await db
      .collection('rooms')
      .doc(roomID)
      .delete();

    console.log(`Removed room ${roomID}`);
    res.status(200).send({
      result: {
        id: room.id
      }
    });
  } catch (error) {
    console.log(`error: ${error}`);
  }
});

app.post('/startRoom', async (req, res) => {
  if (!('roomID' in req.body)) {
    res.status(400).send({ error: 'body incorrect' });
    return;
  }

  try {
    const roomID = req.body.roomID;
    const room = await db
      .collection('rooms')
      .doc(roomID);
    await room.update({ isLive: true });
    console.log(`Room is now live ${roomID}`);
    res.status(200).send({
      result: {
        id: room.id
      }
    });
  } catch (error) {
    console.log(`error: ${error}`);
  }
});

module.exports = app;
