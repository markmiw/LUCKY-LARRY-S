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
INSERT INTO users (username, password, countryID, balance, winnings) VALUES
('Bruce', 'Waifus', 1, 2000, 10000000),
('Matthew', 'Moofus', 1, 2000, 10),
('Cornelius', 'Mario', 1, 0, 0),
('River', 'Animation', 1, 2000, 100),
('Jesse', 'Roulette', 1, 2000, 1000),
('Andy', 'Anime', 1, 2000, 100000),
('Mark', 'Tensorflow', 1, 2000, 1000),
('Gary', 'Pokemon', 1, 2000, 10000),
('Bruce2', 'Waifu', 1, 2000, 1);
