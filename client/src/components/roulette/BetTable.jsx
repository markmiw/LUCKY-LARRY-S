import React, { useState } from 'react';
import axios from 'axios';
import { BetNumberGrid, Number0Button, NumberButton, BetColorOddGrid, RedColorButton, BlackColorButton, Bet12Grid, Bet12Button, Bet18Grid, Bet18Button, BetRowGrid, BetRowButton } from './roulette.styled.js';


export default function BetTable({ winNum, showModal, setShowModal, setResult }) {
  // userbet
  const [num, setNum] = useState({ pick: '', bet: '' });
  const [color, setColor] = useState({ pick: '', bet: '' });
  const [eO, setEO] = useState({ pick: '', bet: '' });
  const [rangeOf12, setRangeOf12] = useState({ pick: '', bet: '' });
  const [firstHalf, setFirstHalf] = useState({ pick: '', bet: '' });
  const [numRow, setNumRow] = useState({ pick: '', bet: '' });

  //Model


  let handleSubmit = () => {
    axios.get('/api/user/roulette', {
      winNum: winNum, num: num, color: color, eO: eO, rangeOf12: rangeOf12, firstHalf: firstHalf, numRow: numRow
    })
       //change the state of the hook passed into this function from roulette wheel
      .then((results => setResult(results.data))
      )
      .catch(err => console.log(err));
  }

  // need a function that handles the amount bet pop upc
  const openModal = () => {
    setShowModal(prev => !prev);
  }

  return (
    <div>

      <Number0Button onClick={() => { setNum(0); openModal(); }}>
        0
      </Number0Button>
      <BetNumberGrid>
        {[...Array(36)].map((star, index) => {
          const val = index + 1;
          return (
            <NumberButton value={val} key={index} onClick={() => { setNum(val); openModal(); }}>
              {val}
              &nbsp;
            </NumberButton>
          );
        })}
      </BetNumberGrid>
      <BetColorOddGrid>
        <RedColorButton onClick={() => { setColor({ pick: 'red' }); openModal(); }}>Red</RedColorButton>
        <BlackColorButton onClick={() => { setColor({ pick: 'black' }); openModal(); }}>Black</BlackColorButton>
        <button onClick={() => { setEO({ pick: 'odd' }); openModal(); }}>Even</button>
        <button onClick={() => { setEO({ pick: 'even' }); openModal(); }}>Odd</button>

      </BetColorOddGrid>

      <Bet12Grid>
        <Bet12Button onClick={() => { setRangeOf12({ pick: 1 }); openModal(); }}>1st12 </Bet12Button>
        <Bet12Button onClick={() => { setRangeOf12({ pick: 2 }); openModal(); }}>2nd12 </Bet12Button>
        <Bet12Button onClick={() => { setRangeOf12({ pick: 3 }); openModal(); }}>3rd12 </Bet12Button>
      </Bet12Grid>

      <Bet18Grid>
        <Bet18Button onClick={() => { setFirstHalf({ pick: 1 }); openModal(); }}>1to18 </Bet18Button>
        <Bet18Button onClick={() => { setFirstHalf({ pick: 2 }); openModal(); }}>19to36 </Bet18Button>
      </Bet18Grid>

      <BetRowGrid>
        <BetRowButton onClick={() => { setNumRow({ pick: 1 }); openModal(); }}>2to1 - 1s row </BetRowButton>
        <BetRowButton onClick={() => { setNumRow({ pick: 2 }); openModal(); }}>2to1 - 2s row </BetRowButton>
        <BetRowButton onClick={() => { setNumRow({ pick: 3 }); openModal(); }}>2to1 - 3s row </BetRowButton>
      </BetRowGrid>

      {/* display of current bets if no visuals to show what has been checked */}
      <div>Your current bets:
        {num.pick}&nbsp;
        {color.pick === 'red' ? 'Red' : color.pick === 'black' ? 'Black' : null}&nbsp;
        {eO.pick === 'odd' ? 'Odd' : eO.pick === 'even' ? 'Even' : null}&nbsp;
        {rangeOf12.pick === 1 ? '1st12' : rangeOf12.pick === 2 ? '2nd12' : rangeOf12.pick === 3 ? '3rd12' : null}&nbsp;
        {firstHalf.pick === 1 ? '1to18' : firstHalf.pick === 2 ? '19to36' : null}&nbsp;
        {numRow.pick === 1 ? '1st row' : numRow.pick === 2 ? '2nd row' : numRow.pick === 3 ? '3rd row' : null}</div>
    </div>

  );
}
