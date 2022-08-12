const db = require('./index.js');

const errorHandler = (err) => console.error(err);

const getTestData = () => {
  let queryString = `SELECT * FROM test`;

  return db.query(queryString)
    .then((res) => res.rows)
    .catch(errorHandler);
};

module.exports = {
  getTestData
};
