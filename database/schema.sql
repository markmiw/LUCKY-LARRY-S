-- postgres schema

DROP DATABASE IF EXISTS luckylarrys;
CREATE DATABASE luckylarrys;

\c luckylarrys;

CREATE TABLE country (
  id SERIAL PRIMARY KEY NOT NULL,
  country VARCHAR(30) NOT NULL,
  flag VARCHAR(300) NOT NULL
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR(256) UNIQUE NOT NULL,
  password VARCHAR(256) NOT NULL,
  countryID INT,
  balance INT NOT NULL,
  winnings INT NOT NULL,
  FOREIGN KEY (countryID) REFERENCES country(id)
);

CREATE TABLE friends (
  id SERIAL PRIMARY KEY NOT NULL,
  userID INT,
  friendID INT,
  FOREIGN KEY (userID) REFERENCES users(id),
  FOREIGN KEY (friendID) REFERENCES users(id)
);

CREATE TABLE chat (
  id SERIAL PRIMARY KEY NOT NULL,
  date BIGINT NOT NULL,
  message VARCHAR(500) NOT NULL,
  userID INT,
  FOREIGN KEY (userID) REFERENCES users(id)
);

CREATE INDEX IF NOT EXISTS idx_users ON users(id);
CREATE INDEX IF NOT EXISTS idx_country ON country(id);
CREATE INDEX IF NOT EXISTS idx_friends ON friends(userID);
CREATE INDEX IF NOT EXISTS idx_chat ON chat(userID);


INSERT INTO country (country, flag) VALUES ('TEST', 'TEST');
INSERT INTO users (username, password, countryID, balance, winnings) VALUES ('Bruce', 'Waifus', 1, 2000, 0);

-- ---
-- Table 'test'
-- ---

CREATE TABLE test (
  id SERIAL NOT NULL,
  num INTEGER,
  PRIMARY KEY (id)
);
INSERT INTO test (num) VALUES (12);
INSERT INTO test (num) VALUES (15);
INSERT INTO test (num) VALUES (99);
INSERT INTO test (num) VALUES (-4);


-------Roulette---------
-- USE roulette

--id = num
--E0 = even/odd - even = 'even', odd = 'odd', 0 = 'zero'
--color = r='red', b='black', g='green'
--Rangeof12 = 0,1st,2nd,3rd range
--firstHalf = 1 to 18 = 1, 19-36 = 2, 0 = 0
--numRow =1,2,3 rows, 0
-- further functionality - add relation in DB for when users pick middle quadrants between numbers

DROP TABLE IF EXISTS RouletteNums;
CREATE TABLE IF NOT EXISTS RouletteNums(
  id INTEGER NOT NULL PRIMARY KEY,
  evenOdd VARCHAR(5) NOT NULL,
  color VARCHAR(6) NOT NULL,
  rangeOf12 INTEGER NOT NULL,
  firstHalf INTEGER NOT NULL,
  numRow INTEGER NOT NULL
);

-- Load data in
INSERT INTO RouletteNums(id, evenOdd, color, rangeOf12, firstHalf, numRow) VALUES (0, 'zero', 'green', 0, 1, 0),
(1, 'odd', 'black', 1, 1, 1),
(2, 'even', 'red', 1, 1, 2),
(3, 'odd', 'black', 1, 1, 3),
(4, 'even', 'red', 1, 1, 1),
(5, 'odd', 'black', 1, 1, 2),
(6, 'even', 'red', 1, 1, 3),
(7, 'odd', 'black', 1, 1, 1),
(8, 'even', 'red', 1, 1, 2),
(9, 'odd', 'black', 1, 1, 3),
(10, 'even', 'red', 1, 1, 1),
(11, 'odd', 'black', 1, 1, 2),
(12, 'even', 'red', 1, 1, 3),
(13, 'odd', 'black', 1, 1, 1),
(14, 'even', 'red', 1, 1, 2),
(15, 'odd', 'black', 1, 1, 3),
(16, 'even', 'red', 1, 1, 1),
(17, 'odd', 'black', 1, 1, 2),
(18, 'even', 'red', 1, 1, 3),
(19, 'odd', 'black', 2, 2, 1),
(20, 'even', 'red', 2, 2, 2),
(21, 'odd', 'black', 2, 2, 3),
(22, 'even', 'red', 2, 2, 1),
(23, 'odd', 'black', 2, 2, 2),
(24, 'even', 'red', 2, 2, 3),
(25, 'odd', 'black', 3, 2, 1),
(26, 'even', 'red', 3, 2, 2),
(27, 'odd', 'black', 3, 2, 3),
(28, 'even', 'red', 3, 2, 1),
(29, 'odd', 'black', 3, 2, 2),
(30, 'even', 'red', 3, 2, 3),
(31, 'odd', 'black', 3, 2, 1),
(32, 'even', 'red', 3, 2, 2),
(33, 'odd', 'black', 3, 2, 3),
(34, 'even', 'red', 3, 2, 1),
(35, 'odd', 'black', 3, 2, 2),
(36, 'even', 'red', 3, 2, 3)

-- psql postgres postgres < /Users/.... rouletteSchema.sql;
