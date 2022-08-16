/* eslint-disable no-console */
const express = require('express');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

// Adding this here for future implementation
// const expressStaticGzip = require("express-static-gzip");

const db = require('../database');
const router = require('./routes');

const app = express();

// middleware to convert into json readable data
app.use(express.json());

// middleware for logging requests made to the server
app.use(morgan('tiny'));

app.use(express.static('client/dist'));

app.use('/api', router);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '/client/dist/index.html'), (err) => {
    if (err) {
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
