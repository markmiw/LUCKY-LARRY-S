const express = require('express');
const morgan = require('morgan');
require('dotenv').config();

// const router = require('./routes');

const app = express();

// middleware for logging requests made to the server
app.use(morgan('tiny'));

app.use(express.json());
app.use(express.static('client/dist'));

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
})
