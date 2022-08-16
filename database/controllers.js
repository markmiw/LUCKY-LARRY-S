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

const getUserId = (username) => {
  const queryString = `
    SELECT id
    FROM users
    WHERE username = $1
  `;

  return db.query(queryString, [username])
    .then((results) => {
      if (results.rows[0]) {
        return results.rows[0].id;
      }
      return null;
    })
    .catch(errorHandler);
};

const addFriendRelationship = (userID, friendID) => {
  const queryString = `
    WITH insertOne AS (
      INSERT INTO friends (userID, friendID) VALUES ($1, $2)
    ), insertTwo AS (
      INSERT INTO friends (userID, friendID) VALUES ($2, $1)
    )
    SELECT 'done' AS status
  `;

  return db.query(queryString, [userID, friendID])
    .then((results) => {
      if (results.rows[0]) {
        return results.rows[0];
      }
      return null;
    })
    .catch(errorHandler);
};

const checkIfFriendshipExists = (userID, friendID) => {
  const queryString = `
    SELECT * FROM friends WHERE userID = $1 AND friendID = $2;
  `;

  return db.query(queryString, [userID, friendID])
    .then((results) => {
      if (results.rows[0]) {
        return results.rows[0];
      }
      return null;
    })
    .catch(errorHandler);
};

const getAllFriends = (userID) => {
  const queryString = `
    WITH friendIDs AS (
      SELECT friendID
      FROM friends
      WHERE userID = $1
    )
    SELECT u.id, u.username, c.country
    FROM users u
    JOIN
    country c
    ON u.countryID = c.id
    WHERE u.id IN (SELECT friendID FROM friendIDs)
  `;

  return db.query(queryString, [userID])
    .then((results) => {
      if (results.rows[0]) {
        return results.rows;
      }
      return null;
    })
    .catch(errorHandler);
};

const getLeaderboard = () => {
  const queryString = 'SELECT * FROM users ORDER BY winnings DESC LIMIT 25';

  return db.query(queryString)
    .then((results) => results.rows)
    .catch(errorHandler);
};

const getGlobalChat = (loginTime) => {
  const queryString = 'SELECT * FROM chat where date > $1';
  return db.query(queryString, [Number(loginTime)])
    .then((results) => results.rows)
    .catch(errorHandler);
};
// INSERT INTO chat(username, message, country, date) VALUES('markmiw', 'hello', 'USA', 1660633394434);

const postGlobalChat = (username, message, country) => {
  const queryString = 'INSERT INTO chat(username, message, country, date) VALUES($1, $2, $3, $4)';
  return db.query(queryString, [username, message, country, Date.now()])
    .then((results) => {
      results.rows
    })
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
  getUserId,
  addFriendRelationship,
  getAllFriends,
  getGlobalChat,
  postGlobalChat,
  getLeaderboard,
  getCountry,
  getBalance,
  updateBalanceBasedOnWinnings,
  checkIfFriendshipExists,
  createUser,
  addBalance,
};
