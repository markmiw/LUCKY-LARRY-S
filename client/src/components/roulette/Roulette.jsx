import React, { useState } from 'react'
import RouletteWheel from './RouletteWheel.jsx';
import BetTable from './BetTable.jsx';
import { RouletteGameGrid,  } from './roulette.styled.js';
import Modal from './Modal.jsx';
import Confetti from 'react-confetti';


export default function Roulette () {

  const [winNum, setWinNum] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentBetOption, setCurrentBetOption] = useState('');
  const [betAmount, setBetAmount] = useState(0);
    //result hook
  const [result, setResult] = useState('')
  const [winState, setWinState] = useState(false);

  // function that changes winState to false after 5 seconds
  // const function celebration () {
  //   setTimeout(setWinState(false), 5000)
  // }

  return (
    <RouletteGameGrid>
      {/* {winState && <Confetti/>} */}
      <Modal showModal={showModal} setShowModal={setShowModal} currentBetOption={currentBetOption} betAmount={betAmount} setBetAmount={setBetAmount} />
      <RouletteWheel winNum={winNum} setWinNum={setWinNum} result={result} setWinState={setWinState} />
      <BetTable winNum={winNum} showModal={showModal} currentBetOption={currentBetOption} setCurrentBetOption={setCurrentBetOption} setShowModal={setShowModal} setResult={setResult} />
    </RouletteGameGrid>
  )
}

