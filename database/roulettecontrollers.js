const db = require('./index');

const errorHandler = (err) => console.error(err);

const checkNum = (req, res) => {
  const { winNum, num, color, eO, rangeOf12, firstHalf, numRow } = req.query;
  const query = `SELECT * FROM RouletteNums WHERE id = ${winNum}`;
  const winMessage;
  pool
    .query(query)
    .then((results) =>
    const { resNum, resColor, resEO, resRange, resFirstHalf, resNumRow } = results;
      //fill in what happens when the result num/color/etc matches the choice
      resNum === num ? : null;
      resColor === color ? : null;
      resEO === eO ? : null;
      resRange === rangeOf12 ? : null;
      resNumRow === numRow ? : null;
      res.status(200).send(winMessage))
    .catch((err) => { res.status(500); console.log(err) })
}