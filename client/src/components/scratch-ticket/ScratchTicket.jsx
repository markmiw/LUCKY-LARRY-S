import React, { useState, useEffect } from 'react';
import ScratchCard from 'react-scratchcard-v2';

import IMG from './test.png';

const GRID_COLS = 5;
const cardValues = [1, 2, 5];

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getNUnique(n) {
  const arr = [];
  const set = new Set();
  for (let i = 0; i < n; i += 1) {
    let num = getRandom(1, 99);
    while (set.has(num)) {
      num = getRandom(1, 99);
    }
    arr.push(num);
    set.add(num);
  }
  return arr;
}

export default function ScratchTicket() {
  const [winningValues, setWinningValues] = useState([]);
  const [matchingValues, setMatchingValues] = useState([]);
  const [value, setValue] = useState(1);

  useEffect(() => {
    setWinningValues(getNUnique(5));
    setMatchingValues(getNUnique(25));
  }, []);

  function countMatches() {
    console.log('completed');
    let count = 0;
    winningValues.forEach((amount) => {
      if (matchingValues.includes(amount)) {
        count += 1;
      }
    });
    return count;
  }

  function getWinnings() {
    const numMatches = countMatches();
    console.log(numMatches);
    // do some multiplier
    // 1: value * 0.5; 2: value * 1.25; 3: value * 2; 4: value * 5; 5: JACKPOT
    // axios post
  }

  function changeValue(e) {
    setValue(e.target.value);
  }

  return (
    <div align="center">
      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        {cardValues.map((amount) => (<button key={amount} type="submit" onClick={(e) => changeValue(e)}>{amount}</button>))}
      </div>
      <ScratchCard
        width={500}
        height={650}
        image={IMG}
        finishPercent={80}
        onComplete={() => getWinnings()}
      >
        <div
          style={{ display: 'flex', justifyContent: 'space-evenly' }}
        >
          {winningValues.map((amount) => (
            <div
              key={amount}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100px',
                height: '100px',
                border: '1px solid',
                margin: '10px',
              }}
            >
              {amount}
            </div>
          ))}
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)`,
            margin: '10px',
          }}
        >
          {matchingValues.map((amount) => (
            <div
              key={amount}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100px',
                border: '1px solid',
              }}
            >
              {amount}
            </div>
          ))}
        </div>
      </ScratchCard>
    </div>
  );
}
