const db = require('./index');

const errorHandler = (err) => console.error(err);

const getTestData = () => {
  const queryString = 'SELECT * FROM test';

  return db.query(queryString)
    .then((res) => res.rows)
    .catch(errorHandler);
};

const getUser = () => {
  const queryString = 'SELECT * FROM users';

  return db.query(queryString)
    .then((results) => results.rows)
    .catch(errorHandler);
};

const getLeaderboard = () => {
  const queryString = 'SELECT * FROM users ORDER BY winnings DESC LIMIT 25';

  return db.query(queryString)
    .then((results) => results.rows)
    .catch(errorHandler);
};

const getCountry = (countryid) => {
  const queryString = 'SELECT country FROM country WHERE id = $1';

  return db.query(queryString, [countryid])
    .then((results) => results.rows)
    .catch(errorHandler);
};

const getBalance = (userid) => {
  const queryString = 'SELECT balance FROM users WHERE id = $1';

  return db.query(queryString, [userid])
    .then((results) => results.rows[0].balance)
    .catch(errorHandler);
};

const updateBalanceBasedOnWinnings = (userid, bet, winnings) => {
  const queryString = `
      UPDATE users
      SET balance = balance - $2 + $3,
      winnings = winnings + $3
      WHERE id = $1
      RETURNING balance
    `;

  return db.query(queryString, [userid, bet, winnings])
    .then((results) => results.rows[0].balance)
    .catch(errorHandler);
};

const getSpecificUser = (username) => {
  const queryString = 'SELECT * FROM users WHERE username = $1';
  return db.query(queryString, [username])
    .then((results) => results.rows)
    .catch(errorHandler);
};

const createUser = (info) => {
  const queryString = 'INSERT INTO users (username, password, balance, winnings, countryid) VALUES ($1, $2, $3, $4, (SELECT id from country WHERE country.country = $5))';
  const args = [info.username, info.password, 0, 0, info.country];

  return db.query(queryString, args)
    .then((results) => results)
    .catch(errorHandler);
};

const addBalance = (info) => {
  const queryString = 'UPDATE users SET balance = balance + $1 WHERE id = $2 RETURNING *';
  const args = [info.amount, info.id];

  return db.query(queryString, args)
    .then((results) => results)
    .catch(errorHandler);
};

module.exports = {
  getTestData,
  getSpecificUser,
  getUser,
  getLeaderboard,
  getCountry,
  getBalance,
  updateBalanceBasedOnWinnings,
  createUser,
  addBalance,
};
