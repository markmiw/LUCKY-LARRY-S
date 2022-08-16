const pool =require('../../database/index.js')

module.exports.checkNum = (req, res) => {
 const { winNum, num, color, eO, rangeOf12, firstHalf, numRow } = JSON.parse(req.query.betInfo);
 console.log(winNum, num, color, eO, rangeOf12, firstHalf, numRow);
  const query = `SELECT * FROM RouletteNums WHERE id = ${winNum}`;
  const winnings = '', winsNum= '', winsCol= '', winsEO= '', winsRange= '', winsRow= '';
  const winInfo = {};
  const winMultiplier = (result, userInput, winStorage, multiplier) => {
    result === userInput.pick ? winStorage = userInput.bet * multiplier : null;
  };
  const winInfoPop = (winStorage) => {
    winStorage ? winInfo[winStorage] = winStorage : null;
  };
  pool
    .query(query)
    .then((results) => {console.log('this', results);
    const { resNum, resColor, resEO, resRange, resFirstHalf, resNumRow } = results;
    console.log(resNum)
      winMultipler(resNum, num, winsNum, 35);
      winMultipler(resColor, color, winsCol, 2);
      winMultipler(resEO, eO, winsEO, 2);
      winMultipler(resRange, rangeOf12, winsRange, 3);
      winMultipler(resNumRow, numRow, winsRow, 3);
      winnings = (winsNum + winsCol + winsEo + winsRange + winsRow);})
        .then(() => {
        if (winnings > 0) {
          winInfoPop(winnings);
          winInfoPop(winsNum);
          winInfoPop(winsCol);
          winInfoPop(winsEO);
          winInfoPop(winsRange);
          winInfoPop(winsRow);
          //add the winnings to the user via the implemented controller ***
          //add winnings to the user's records - to be implemented w/ global function ***
          res.status(200).send(winInfo)
        } else {
          res.status(200).send(false)
        }
      })
  .catch((err) => { res.status(500); console.log(err) })
    }