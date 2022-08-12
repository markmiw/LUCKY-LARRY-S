const express = require('express');
// import path from 'path';

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.static('client/dist'));

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
})
