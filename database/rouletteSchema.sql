DROP DATABASE IF EXISTS roulette;
CREATE DATABASE roulette;

-- USE roulette
\c roulette

--id = num
--E0 = even/odd - true = even, odd = false
--color = r='red', b='black', g='green'
--Rangeof12 = 1st,2nd,3rd range
--firstHalf = 1 to 18 = true, 19-36 = false
--numRow =1,2,3 rows
-- further functionality - add relation in DB for when users pick middle quadrants between numbers

DROP TABLE IF EXISTS RouletteNums;
CREATE TABLE IF NOT EXISTS RouletteNums(
  id INTEGER NOT NULL PRIMARY KEY,
  evenOdd: BOOLEAN NOT NULL,
  color: VARCHAR(1) NOT NULL,
  rangeOf12: INTEGER NOT NULL,
  rangeOf18: INTEGER NOT NULL,
  numRow: INTEGER NOT NULL,
)

-- Load data in
INSERT into table RouletteNums(id, evenOdd, color, rangeOf12, firstHalf, numRow) VALUES (0, even, green, 0, 1, 0)
INSERT into table RouletteNums(id, evenOdd, color, rangeOf12, firstHalf, numRow) VALUES (1, odd, black, 1, 1, 1)
INSERT into table RouletteNums(id, evenOdd, color, rangeOf12, firstHalf, numRow) VALUES (2, even, black, 1, 1, 2)
INSERT into table RouletteNums(id, evenOdd, color, rangeOf12, firstHalf, numRow) VALUES (3, odd, black, 1, 1, 3)
INSERT into table RouletteNums(id, evenOdd, color, rangeOf12, firstHalf, numRow) VALUES (4, even, black, 1, 1, 1)
INSERT into table RouletteNums(id, evenOdd, color, rangeOf12, firstHalf, numRow) VALUES (5, odd, black, 1, 1, 2)
INSERT into table RouletteNums(id, evenOdd, color, rangeOf12, firstHalf, numRow) VALUES (6, even, black, 1, 1, 3)
INSERT into table RouletteNums(id, evenOdd, color, rangeOf12, firstHalf, numRow) VALUES (7, odd, black, 1, 1, 1)
INSERT into table RouletteNums(id, evenOdd, color, rangeOf12, firstHalf, numRow) VALUES (8, even, black, 1, 1, 2)
INSERT into table RouletteNums(id, evenOdd, color, rangeOf12, firstHalf, numRow) VALUES (9, odd, black, 1, 1, 3)
INSERT into table RouletteNums(id, evenOdd, color, rangeOf12, firstHalf, numRow) VALUES (10, even, black, 1, 1, 1)
INSERT into table RouletteNums(id, evenOdd, color, rangeOf12, firstHalf, numRow) VALUES (11, odd, black, 1, 1, 2)
INSERT into table RouletteNums(id, evenOdd, color, rangeOf12, firstHalf, numRow) VALUES (12, even, black, 1, 1, 3)
INSERT into table RouletteNums(id, evenOdd, color, rangeOf12, firstHalf, numRow) VALUES (13, odd, black, 1, 1, 1)
INSERT into table RouletteNums(id, evenOdd, color, rangeOf12, firstHalf, numRow) VALUES (14, even, black, 1, 1, 2)
INSERT into table RouletteNums(id, evenOdd, color, rangeOf12, firstHalf, numRow) VALUES (15, odd, black, 1, 1, 3)
INSERT into table RouletteNums(id, evenOdd, color, rangeOf12, firstHalf, numRow) VALUES (16, even, black, 1, 1, 1)
INSERT into table RouletteNums(id, evenOdd, color, rangeOf12, firstHalf, numRow) VALUES (17, odd, black, 1, 1, 2)
INSERT into table RouletteNums(id, evenOdd, color, rangeOf12, firstHalf, numRow) VALUES (18, even, black, 1, 1, 3)
INSERT into table RouletteNums(id, evenOdd, color, rangeOf12, firstHalf, numRow) VALUES (19, odd, black, 2, 2, 1)
INSERT into table RouletteNums(id, evenOdd, color, rangeOf12, firstHalf, numRow) VALUES (20, even, red, 2, 2, 2)
INSERT into table RouletteNums(id, evenOdd, color, rangeOf12, firstHalf, numRow) VALUES (21, odd, black, 2, 2, 3)
INSERT into table RouletteNums(id, evenOdd, color, rangeOf12, firstHalf, numRow) VALUES (22, even, red, 2, 2, 1)
INSERT into table RouletteNums(id, evenOdd, color, rangeOf12, firstHalf, numRow) VALUES (23, odd, black, 2, 2, 2)
INSERT into table RouletteNums(id, evenOdd, color, rangeOf12, firstHalf, numRow) VALUES (24, even, red, 2, 2, 3)
INSERT into table RouletteNums(id, evenOdd, color, rangeOf12, firstHalf, numRow) VALUES (25, odd, black, 3, 2, 1)
INSERT into table RouletteNums(id, evenOdd, color, rangeOf12, firstHalf, numRow) VALUES (26, even, red, 3, 2, 2)
INSERT into table RouletteNums(id, evenOdd, color, rangeOf12, firstHalf, numRow) VALUES (27, odd, black, 3, 2, 3)
INSERT into table RouletteNums(id, evenOdd, color, rangeOf12, firstHalf, numRow) VALUES (28, even, red, 3, 2, 1)
INSERT into table RouletteNums(id, evenOdd, color, rangeOf12, firstHalf, numRow) VALUES (29, odd, black, 3, 2, 2)
INSERT into table RouletteNums(id, evenOdd, color, rangeOf12, firstHalf, numRow) VALUES (30, even, red, 3, 2, 3)
INSERT into table RouletteNums(id, evenOdd, color, rangeOf12, firstHalf, numRow) VALUES (31, odd, black, 3, 2, 1)
INSERT into table RouletteNums(id, evenOdd, color, rangeOf12, firstHalf, numRow) VALUES (32, even, red, 3, 2, 2)
INSERT into table RouletteNums(id, evenOdd, color, rangeOf12, firstHalf, numRow) VALUES (33, odd, black, 3, 2, 3)
INSERT into table RouletteNums(id, evenOdd, color, rangeOf12, firstHalf, numRow) VALUES (34, even, red, 3, 2, 1)
INSERT into table RouletteNums(id, evenOdd, color, rangeOf12, firstHalf, numRow) VALUES (35, odd, black, 3, 2, 2)
INSERT into table RouletteNums(id, evenOdd, color, rangeOf12, firstHalf, numRow) VALUES (36, even, red, 3, 2, 3)

-- psql postgres postgres < /Users/.... rouletteSchema.sql;