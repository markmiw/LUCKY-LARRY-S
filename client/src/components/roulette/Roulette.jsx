import React, { useState } from 'react';
import styled from 'styled-components';
import RouletteWheel from './RouletteWheel';
import BetTable from './BetTable';

export default function Roulette () {
  const [betInfo, setBetInfo] = useState('');

  return (
    <RouletteGameGrid>
      {/* {winState && <Confetti/>} */}
      <RouletteWheel betInfo={betInfo}/>
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