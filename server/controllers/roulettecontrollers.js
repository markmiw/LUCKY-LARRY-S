/* eslint-disable no-unused-expressions */
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASS,
  port: process.env.PGPORT,
});

module.exports.checkNum = (req, res) => {
  const winNum = JSON.parse(req.query.winNum);
  const {
    num, col, eO, rangeOf12, firstHalf, numRow,
  } = JSON.parse(req.query.betInfo);
  const query = `SELECT * FROM RouletteNums WHERE id = ${winNum}`;
  let winnings = 0;
  const winMultipler = (result, userInput, multiplier) => {
    result === userInput.pick ? winnings += userInput.bet * multiplier : null;
  };
  pool
    .query(query)
    .then((results) => {
      const {
        id, color, evenodd, rangeof12, firsthalf, numrow,
      } = results.rows[0];
      winMultipler(id, num, 35);
      winMultipler(color, col, 2);
      winMultipler(evenodd, eO, 2);
      winMultipler(rangeof12, rangeOf12, 3);
      winMultipler(firsthalf, firstHalf, 2);
      winMultipler(numrow, numRow, 3);
    })
    .then(() => {
      if (winnings > 0) {
        // add the winnings to the user via the implemented controller ***
        // add winnings to the user's records - to be implemented w/ global function ***
        res.status(200).send(JSON.stringify(winnings));
      } else {
        res.status(200).send(false);
      }
    })
    .catch((err) => { res.status(500) });
};