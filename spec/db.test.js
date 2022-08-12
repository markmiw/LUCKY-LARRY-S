const { getTestData } = require('../database/controllers');

getTestData()
  .then((rows) => {
    console.log(rows);
  });
