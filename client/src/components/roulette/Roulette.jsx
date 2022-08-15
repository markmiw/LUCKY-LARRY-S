import React, { useState } from 'react'
import RouletteWheel from './RouletteWheel.jsx';
import BetTable from './BetTable.jsx';
import { RouletteGameGrid,  } from './roulette.styled.js';
import Modal from './model.jsx';

export default function Roulette () {

  const [winNum, setWinNum] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentBetOption, setCurrentBetOption] = useState('');
    //result hook
  const [result, setResult] = useState('')


  return (
    <RouletteGameGrid>
      <Modal showModal={showModal} setShowModal={setShowModal} currentBetOption={currentBetOption} />
      <RouletteWheel winNum={winNum} setWinNum={setWinNum} result={result} />
      <BetTable winNum={winNum} showModal={showModal} currentBetOption={currentBetOption} setCurrentBetOption={setCurrentBetOption} setShowModal={setShowModal} setResult={setResult} />
    </RouletteGameGrid>

  )
}

