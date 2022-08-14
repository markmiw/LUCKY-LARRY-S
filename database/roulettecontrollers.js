const db = require('./index');

const errorHandler = (err) => console.error(err);

const checkNum = (req, res) => {
  const { winNum, num, color, eO, rangeOf12, firstHalf, numRow} = req.query;
  const query = `SELECT * FROM RouletteNums WHERE id = ${winNum}`;
  const winnings, winsNum, winsCol, winsEO, winsRange, winsRow, winsCol;
  const winInfo = {};
  const winMultiplier = (result, userInput, winStorage, multiplier) => {
    result === userInput.pick ? winStorage = userInput.bet * multiplier : null;
  };
  const winInfoPop = (winStorage) => {
    winStorage ? winInfo[winStorage] = winStorage : null;
  };
  pool
    .query(query)
    .then((results) =>
    const { resNum, resColor, resEO, resRange, resFirstHalf, resNumRow } = results;
      //seperate winnings
      winMultipler(resNum, num, winsNum, 35);
      winMultipler(resColor, color, winsCol, 2);
      winMultipler(resEO, eO, winsEO, 2);
      winMultipler(resRange, rangeOf12, winsRange, 3);
      winMultipler(resNumRow, numRow, winsRow, 3);
      winnings = (winsNum + winsCol = winsEo + winsRange + winsRow);)
        .then(() => {
        if (winnings > 0) {
          winInfoPop(winnings);
          winInfoPop(winsNum);
          winInfoPop(winsCol);
          winInfoPop(winsEO);
          winInfoPop(winsRange);
          winInfoPop(winsRow);
          //add the winnings to the user via the implemented controller ***
          //add winnings to the user's records ***
          res.status(200).send(winInfo)
        }
        res.status(200).send(false)
      }
      res.status(200).send(winMessage))
  .catch((err) => { res.status(500); console.log(err) })
    }