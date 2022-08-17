/* eslint-disable no-unused-expressions */
const { Pool } = require('pg');
const { getBalance, updateBalanceBasedOnWinnings, updateBalanceAfterLosing } = require('../../database/controllers');

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASS,
  port: process.env.PGPORT,
});

module.exports.checkNum = async (req, res) => {
  const userId = JSON.parse(req.query.user).id;
  const {
    num, col, eO, rangeOf12, firstHalf, numRow,
  } = JSON.parse(req.query.betInfo);
  const spentMoney = (num.bet + col.bet + eO.bet + rangeOf12.bet + firstHalf.bet + numRow.bet);

  const userHasEnoughMoney = await getBalance(userId) >= spentMoney;
  if (!userHasEnoughMoney) {
    res.status(200).send('insufficient funds');
    return;
  }
  const winNum = JSON.parse(req.query.winNum);
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
    .then(async () => {
      if (winnings > 0) {
        // change the user balance via the implemented controller ***
        const updatedBalance = await updateBalanceBasedOnWinnings(userId, spentMoney, winnings);
        // add winnings to the user's records - to be implemented w/ global function ***
        res.status(200).send({ winAmount: winnings, updatedBalance });
      } else {
        const updatedBalance = await updateBalanceAfterLosing(userId, spentMoney);
        console.log(updatedBalance);
        res.status(200).send({ winAmount: winnings, updatedBalance });
      }
    })
    .catch((err) => { res.status(500); console.log(err); });
};