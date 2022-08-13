/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import ScratchCard from 'react-scratchcard-v2';
import IMG from '../../../../assets/test.jpg';

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
  const [winningValues, setWinningValues] = useState(getNUnique(5));
  const [matchingValues, setMatchingValues] = useState(getNUnique(25));
  const [value, setValue] = useState(1);
  const [playing, setPlaying] = useState(false);

  function countMatches() {
    console.log('completed');
    let count = 0;
    winningValues.forEach((num) => {
      if (matchingValues.includes(num)) {
        count += 1;
      }
    });
    return count;
  }

  function getWinnings() {
    let numMatches = countMatches();

    // do some multiplier
    // 1: value * 0.5; 2: value * 1; 3: value * 2; 4: value * 5; 5: JACKPOT
    // axios post
  }

  function changeValue(e) {
    console.log(`clicked on ${e.target.innerHTML} scratcher`);
    setValue(e.target.innerHTML);
  }

  function confirmPlay(e) {
    setPlaying(true);
    // need to lock buttons
    // remove overlay div with z-index 2
  }

  return (
    <div>
      <div
        style={{ display: 'flex', justifyContent: 'space-evenly' }}
      >
        {cardValues.map((num) => (
          <button
            key={num}
            type="submit"
            onClick={(e) => changeValue(e)}
            style={{ width: '50px', height: '50px' }}
          >
            {num}
          </button>
        ))}
      </div>
      <div id="scratcher">
        {!playing && (
          <div
            style={{
              display: 'grid',
              placeItems: 'center',
              position: 'absolute',
              justifySelf: 'center',
              width: '500px',
              height: '650px',
              color: 'black',
              backgroundColor: 'grey',
              zIndex: '2',
            }}
            onClick={(e) => confirmPlay(e)}
          >
            Wanna scratch?
          </div>
        )}
        <ScratchCard
          width={500}
          height={650}
          image={IMG}
          finishPercent={80}
          onComplete={() => getWinnings()}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-evenly',
            }}
          >
            {winningValues.map((num) => (
              <div
                key={num}
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
                {num}
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
            {matchingValues.map((num) => (
              <div
                key={num}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  height: '100px',
                  border: '1px solid',
                }}
              >
                {num}
              </div>
            ))}
          </div>
        </ScratchCard>
      </div>
    </div>
  );
}
