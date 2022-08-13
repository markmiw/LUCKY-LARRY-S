import React, { useState } from 'react';
import axios from 'axios';
import { BetNumberGrid, Number0Button, NumberButton, BetColorOddGrid, RedColorButton, BlackColorButton,  Bet12Grid, Bet12Button, Bet18Grid, Bet18Button, BetRowGrid, BetRowButton } from './roulette.styled.js'

export default function BetTable() {
  // rouletteInput
  const [winNum, setWinNum] = useState('');

  //userView

  // userbets
  const [num, setNum] = useState('');
  const [color, setColor] = useState('');
  const [eO, setEO] = useState('');
  const [rangeOf12, setRangeOf12] = useState('');
  const [firstHalf, setFirstHalf] = useState('');
  const [numRow, setNumRow] = useState('');

  let handleSubmit = () => {
    axios.get('/roulette', {
      winNum: winNum, num: num, color: color, eO: eO, rangeOf12: rangeOf12, firstHalf: firstHalf, numRow: numRow
    })
      .then((results) => {
        //return winner prize amount won
        //update states or have useEffect
        results.win ? window.alert(`Wow! you just won ${results.win}!!!`) : window.alert('Sorry, not a winner.')
      })
      .catch(err => console.log(err));
  }

  return (
    <div>
      <Number0Button onClick={() => setNum(0)}>
        0
      </Number0Button>
      <BetNumberGrid>
        {[...Array(36)].map((star, index) => {
          const val = index + 1;
          return (
            <NumberButton value={val} onClick={() => setNum(val)}>
              {val}
              &nbsp;
            </NumberButton>
          );
        })}
      </BetNumberGrid>
      <BetColorOddGrid>
        <RedColorButton onClick={() => setColor('red')}>Red</RedColorButton>
        <BlackColorButton onClick={() => setColor('black')}>Black</BlackColorButton>
        <button onClick={() => setEO(true)}>Even</button>
        <button onClick={() => setEO(false)}>Odd</button>

      </BetColorOddGrid>

      <Bet12Grid>
        <Bet12Button onClick={() => setRangeOf12(1)}>1st12 </Bet12Button>
        <Bet12Button onClick={() => setRangeOf12(2)}>2nd12 </Bet12Button>
        <Bet12Button onClick={() => setRangeOf12(3)}>3rd12 </Bet12Button>
      </Bet12Grid>

      <Bet18Grid>
        <Bet18Button onClick={() => setFirstHalf(1)}>1to18 </Bet18Button>
        <Bet18Button onClick={() => setFirstHalf(2)}>19to36 </Bet18Button>
      </Bet18Grid>

      <BetRowGrid>
        <BetRowButton onClick={() => setNumRow(1)}>2to1 - 1s row </BetRowButton>
        <BetRowButton onClick={() => setNumRow(2)}>2to1 - 2s row </BetRowButton>
        <BetRowButton onClick={() => setNumRow(3)}>2to1 - 3s row </BetRowButton>
      </BetRowGrid>

      {/* display of current bets if no visuals to show what has been checked */}
      <div>Your current bets:
        {num}&nbsp;
        {color === 'red' ? 'Red' : color === 'black' ? 'Black' : null}&nbsp;
        {eO}&nbsp;
        {rangeOf12 === 1 ? '1st12' : rangeOf12 === 2 ? '2nd12' : rangeOf12 === 3 ? '3rd12' : null}&nbsp;
        {firstHalf === 1 ? '1to18' : firstHalf === 2 ? '19to36' : null}&nbsp;
        {numRow === 1 ? '1st row' : numRow === 2 ? '2nd row' : numRow === 3 ? '3rd row' : null}</div>
    </div>

  );
}
