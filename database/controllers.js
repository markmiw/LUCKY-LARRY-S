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

const getGlobalChat = (loginTime) => {
  const queryString = 'SELECT * FROM chat where date > $1';

  return db.query(queryString)
    .then((results) => results.rows)
    .catch(errorHandler);
};

const postGlobalChat = ({date, message, username}) => {
  const queryString = 'INSERT INTO chat(date, message, userID) VALUES($1, $2, $3)';

  return db.query(queryString)
    .then((results) => results.rows)
    .catch(errorHandler);
}


module.exports = {
  getTestData,
  getUser,
  getGlobalChat,
  postGlobalChat,
};
