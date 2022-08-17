/* eslint-disable linebreak-style */
const { Pool } = require('pg');
require('dotenv').config();

// Pool uses evironment variables defined in .env, so no options need to be defined
const pool = new Pool();

module.exports = pool;
