import React, { useState } from 'react'
import RouletteWheel from './RouletteWheel.jsx';
import BetTable from './BetTable.jsx';
import { RouletteGameGrid,  } from './roulette.styled.js';

import Confetti from 'react-confetti';


export default function Roulette () {

  const [winNum, setWinNum] = useState('');

    //result hook
  const [winState, setWinState] = useState(false);
  const [betInfo, setBetInfo] = useState('');

  // function that changes winState to false after 5 seconds
  // const function celebration () {
  //   setTimeout(setWinState(false), 5000)
  // }

  return (
    <RouletteGameGrid>
      {/* {winState && <Confetti/>} */}
      <RouletteWheel winNum={winNum} setWinNum={setWinNum} setWinState={setWinState} betInfo={betInfo} />
      <BetTable winNum={winNum} setBetInfo={setBetInfo}/>
    </RouletteGameGrid>
  )
}

