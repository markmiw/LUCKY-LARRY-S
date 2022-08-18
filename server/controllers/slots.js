const { getBalance, updateBalanceBasedOnWinnings } = require('../../database/controllers');

module.exports.spin = (req, res) => {
  const combination = [];
  const { plays } = req.query;
  for (let i = 0; i < (3 * plays); i += 1) {
    combination.push(Math.floor(Math.random() * 5) + 1);
  }
  res.status(201).send(combination);
};

const weightedSpin = (plays) => {
  const combination = [];
  for (let i = 0; i < (3 * plays); i += 1) {
    if (i % 3 === 1) {
      const chance = Math.random() * 100;
      const choices = [1, 2, 3, 4, 5];
      choices.splice(combination[i - 1] - 1, 1);
      if (chance <= 50) {
        combination.push(combination[i - 1]);
      } else if (chance <= 62.5) {
        combination.push(choices[0]);
      } else if (chance <= 75) {
        combination.push(choices[1]);
      } else if (chance <= 87.5) {
        combination.push(choices[2]);
      } else if (chance <= 100) {
        combination.push(choices[3]);
      }
    } else if ((i % 3 === 2) && (combination[i - 2] === combination[i - 1])) {
      const chance = Math.random() * 100;
      const choices = [1, 2, 3, 4, 5];
      choices.splice(combination[i - 1] - 1, 1);
      if (chance <= 20) {
        combination.push(combination[i - 1]);
      } else if (chance <= 40) {
        combination.push(choices[0]);
      } else if (chance <= 60) {
        combination.push(choices[1]);
      } else if (chance <= 80) {
        combination.push(choices[2]);
      } else if (chance <= 100) {
        combination.push(choices[3]);
      }
    } else {
      combination.push(Math.floor(Math.random() * 5) + 1);
    }
  }
  return combination;
};

const calculateWinnings = (slotMatrix, bet, rows) => {
  const multipliers = {
    1: 1,
    2: 3,
    3: 5,
    4: 10,
    5: 50,
  };

  const winningsData = {
    winnings: 0,
    winningRows: [],
  };

  for (let i = 0; i < rows; i += 1) {
    const row = slotMatrix.slice(3 * i, 3 * i + 3);
    if (row.every((item) => item === row[0])) {
      winningsData.winnings += bet * multipliers[row[0]];
      winningsData.winningRows.push(i + 1);
    }
  }

  return winningsData;
};

module.exports.slots = async (req, res) => {
  const { userid, bet, rows } = req.body.data;
  if (!userid || !bet || !rows) {
    res.status(400).send('missing input');
    return;
  }
  const userHasEnoughMoney = await getBalance(userid) >= bet;
  if (!userHasEnoughMoney) {
    res.status(200).send('insufficient funds');
    return;
  }
  const slotResult = weightedSpin(3);
  const winningsData = calculateWinnings(slotResult, bet, rows);
  const updatedBalance = await updateBalanceBasedOnWinnings(userid, bet, winningsData.winnings);
  res.status(201).json({
    rows: slotResult,
    updatedBalance,
    winningsData,
  });
};
