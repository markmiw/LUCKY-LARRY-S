/* eslint-disable no-console */

const express = require('express');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

const db = require('../database');
// const router = require('./routes');

const app = express();

// middleware for logging requests made to the server
app.use(morgan('tiny'));

app.use(express.json());
app.use(express.static('client/dist'));

const router = require('./routes');

app.use('/api', router);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '/client/dist/index.html'), (err) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
  });
});

const server = app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});

// listens for server close event and ends database connection
//   connection stays active after server closes?
//   not sure if that is true actually. this code may be uneccessary
process.on('SIGINT', () => {
  console.log('Goodbye!');
  db.end();
  server.close();
});
