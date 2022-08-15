import React, { useState } from 'react'
import RouletteWheel from './RouletteWheel.jsx';
import BetTable from './BetTable.jsx';
// import { RouletteGameGrid,  } from './roulette.styled.js';
import styled from 'styled-components';
import Confetti from 'react-confetti';


export default function Roulette () {
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
      <RouletteWheel setWinState={setWinState} betInfo={betInfo} setBetInfo={setBetInfo}/>
      <BetTable setBetInfo={setBetInfo}/>
    </RouletteGameGrid>
  )
}


export const RouletteGameGrid = styled.div`
  display: grid;
  width: 80vw;
  max-width: 100%;
  margin: 0 auto;
  height: 100%;
  grid-template-rows: auto auto;
  color: white;
  @media (min-width: 501px) {
    gap: 8%;
  }
  @media (max-width: 500px) {
    gap: 2%;
  }
`