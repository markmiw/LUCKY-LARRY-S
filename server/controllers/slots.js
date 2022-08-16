module.exports.spin = (req, res) => {
  const combination = [];
  const { plays } = req.query;
  for (let i = 0; i < (3 * plays); i += 1) {
    combination.push(Math.floor(Math.random() * 5) + 1);
  }
  res.status(201).send(combination);
};

module.exports.weightedSpin = (req, res) => {
  const combination = [];
  const { plays } = req.query;
  for (let i = 0; i < (3 * plays); i += 1) {
    if (i % 3 === 1) {
      const chance = Math.random() * 100 + 1;
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
      const chance = Math.random() * 100 + 1;
      const choices = [1, 2, 3, 4, 5];
      choices.splice(combination[i - 1] - 1, 1);
      if (chance <= 10) {
        combination.push(combination[i - 1]);
      } else if (chance <= 32.5) {
        combination.push(choices[0]);
      } else if (chance <= 55) {
        combination.push(choices[1]);
      } else if (chance <= 77.5) {
        combination.push(choices[2]);
      } else if (chance <= 100) {
        combination.push(choices[3]);
      }
    } else {
      combination.push(Math.floor(Math.random() * 5) + 1);
    }
  }
  res.status(201).send(combination);
};
