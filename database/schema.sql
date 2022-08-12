-- postgres schema

DROP DATABASE IF EXISTS luckylarrys;
CREATE DATABASE luckylarrys;

\c luckylarrys;

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
