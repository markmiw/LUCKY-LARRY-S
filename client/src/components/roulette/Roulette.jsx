import React, { useState } from 'react'
import RouletteWheel from './RouletteWheel.jsx';
import RouletteBet from './RouletteBet.jsx';
import { RouletteGameGrid,  } from './roulette.styled.js';

export default function Roulette () {

  return (
    <RouletteGameGrid>
      <RouletteWheel />
      <RouletteBet />
    </RouletteGameGrid>

  )
}

