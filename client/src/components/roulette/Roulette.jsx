import React, { useState } from 'react'
import RouletteWheel from './RouletteWheel.jsx';
import RouletteBet from './RouletteBet.jsx';
import { RouletteGameGrid,  } from './roulette.styled.js';
import Modal from './model.jsx';

export default function Roulette () {

  const [winNum, setWinNum] = useState('');
  const [showModal, setShowModal] = useState(false);
    //result hook
  const [result, setResult] = useState('')


  return (
    <RouletteGameGrid>
      <Modal showModal={showModal} setShowModal={setShowModal} />
      <RouletteWheel winNum={winNum} setWinNum={setWinNum} result={result} />
      <RouletteBet winNum={winNum} showModal={showModal} setShowModal={setShowModal} setResult={setResult}/>
    </RouletteGameGrid>

  )
}

