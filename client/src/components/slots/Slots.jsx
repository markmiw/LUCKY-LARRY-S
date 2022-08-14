import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Column from './Column';
import PlayInputs from './PlayInputs';

export default function Slots() {
  const [column1Values, setColumn1Values] = useState([1, 2, 3]);
  const [column2Values, setColumn2Values] = useState([4, 5, 1]);
  const [column3Values, setColumn3Values] = useState([2, 3, 4]);
  const [plays, setPlays] = useState(1);
  const [betAmount, setBetAmount] = useState(1);
  // Will replace below with actual balance from db
  const [balance, setBalance] = useState(10000);
  const [adjustment, setAdjustment] = useState(50);

  function getSlotArray(start, result) {
    const filler = [...new Array(75)].map(() => Math.floor(Math.random() * 5));
    return start.concat(filler, result);
    // last 3 items of this returned array = what slot machine lands on
  }

  function play() {
    // don't allow playing when a roll is in progress
    if (column3Values.length !== 3) {
      return;
    }
    // Decrease balance upon play
    // Balance -= betAmount;
    // setBalance(balance - betAmount * plays);
    // get values from andy
    axios.get('/api/slots', { params: { bet: betAmount, rows: plays } })
      .then((result) => {
        const { rows, winnings } = result.data;
        // const col1 = [rows[0], rows[3], rows[6]];
        // const col2 = [rows[1], rows[4], rows[7]];
        // const col3 = [rows[2], rows[5], rows[8]];
        // Uncomment above, delete sample below after combining server
        const col1 = [1, 2, 2];
        const col2 = [2, 1, 1];
        const col3 = [3, 4, 5];
        setBalance(balance - betAmount * plays);
        // setAdjustment(winnings);
        setColumn1Values(getSlotArray(column1Values, col1));
        setColumn2Values(getSlotArray(column2Values, col2));
        setColumn3Values(getSlotArray(column3Values, col3));
        // Update balance amount after receiving results - done in Columns.jsx
        // Balance += winnings;
      })
      .catch((err) => {
        console.log('Error in Slots play:', err);
      });
  }

  return (
    <>
      <Column
        scrollTime={4}
        values={column1Values}
        setValues={setColumn1Values}
      />
      <Column
        scrollTime={5.5}
        values={column2Values}
        setValues={setColumn2Values}
      />
      <Column
        scrollTime={7}
        values={column3Values}
        setValues={setColumn3Values}
        balance={balance}
        setBalance={setBalance}
        adjustment={adjustment}
        column={3}
      />
      <text>
        Balance: $
        {balance}
      </text>
      <button
        type="button"
        onClick={() => {
          play();
        }}
      >
        Go!
      </button>
      <PlayInputs
        setPlays={setPlays}
        betAmount={betAmount}
        setBetAmount={setBetAmount}
      />
      {console.log('Bet Amount:', betAmount)}
    </>
  );
}
