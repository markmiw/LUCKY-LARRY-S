import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal.jsx';
import { RouletteInfo1Grid, GameDisplay, BetTableContainer, BetNumberGrid, Number0Button, NumberButton, BetColorOddGrid, RedColorButton, BlackColorButton, Bet12Grid, Bet12Button, Bet18Grid, Bet18Button, BetRowGrid, BetRowButton } from './roulette.styled.js';

export default function BetTable({ winNum, setResult, setBetInfo }) {
  // userbet refactor to remove initial pick bets
  const [num, setNum] = useState({ pick: '', bet: '' });
  const [color, setColor] = useState({ pick: '', bet: '' });
  const [eO, setEO] = useState({ pick: '', bet: '' });
  const [rangeOf12, setRangeOf12] = useState({ pick: '', bet: '' });
  const [firstHalf, setFirstHalf] = useState({ pick: '', bet: '' });
  const [numRow, setNumRow] = useState({ pick: '', bet: '' });
  //modal props
  const [showModal, setShowModal] = useState(false);
  const [currentBetOption, setCurrentBetOption] = useState('');
  const [betInput, setBetInput] = useState(false);

  //updates state for roulette wheel
  useEffect(()=> {
    setBetInfo({num: num, color: color, eO: eO, rangeOf12: rangeOf12, firstHalf: firstHalf, numRow: numRow})
  }, [betInput])

  // need a function that handles the amount bet pop upc
  const openModal = (input) => {
    setShowModal(prev => !prev); // prev => !prev
    console.log('modal status is: ', showModal)
    setCurrentBetOption(input)
    //pass in state
    //pass in stateChanger
  }

  return (
    <div>
      <Modal showModal={showModal} setShowModal={setShowModal} currentBetOption={currentBetOption} setNum={setNum} setColor={setColor} setEO={setEO} setFirstHalf={setFirstHalf} setNumRow={setNumRow} setRangeOf12 = {setRangeOf12} num ={num} color ={color} eO ={eO} rangeOf12 = {rangeOf12} firstHalf = {firstHalf} numRow={numRow} betInput = {betInput} setBetInput = {setBetInput}/>
      <RouletteInfo1Grid>

        <GameDisplay>Win Chance: </GameDisplay>
        <GameDisplay>Multiplier: </GameDisplay>

        <GameDisplay>Winning Amount: </GameDisplay>
      </RouletteInfo1Grid>
      <BetTableContainer>
        <Number0Button onClick={() => { setNum(0); openModal('0'); }}>
          0
        </Number0Button>
        <BetNumberGrid>
          {[...Array(36)].map((star, index) => {
            const val = index + 1;
            return (
              <NumberButton key={index} onClick={() => { setNum({pick: val}); openModal(`${val}`); }}>
                {val}
                &nbsp;
              </NumberButton>
            );
          })}
        </BetNumberGrid>
        <BetColorOddGrid>
          <RedColorButton onClick={() => { setColor({ pick: 'red' }); openModal('red')}}>Red</RedColorButton>
          <BlackColorButton onClick={() => { setColor({ pick: 'black' }); openModal('black')}}>Black</BlackColorButton>
          <button onClick={() => { setEO({ pick: 'odd' }); openModal('odd'); }}>Even</button>
          <button onClick={() => { setEO({ pick: 'even' }); openModal('even'); }}>Odd</button>

        </BetColorOddGrid>

        <Bet12Grid>
          <Bet12Button onClick={() => { setRangeOf12({ pick: 1 }); openModal('1st dozen'); }}>1st12 </Bet12Button>
          <Bet12Button onClick={() => { setRangeOf12({ pick: 2 }); openModal('2nd dozen'); }}>2nd12 </Bet12Button>
          <Bet12Button onClick={() => { setRangeOf12({ pick: 3 }); openModal('3rd dozen'); }}>3rd12 </Bet12Button>
        </Bet12Grid>

        <Bet18Grid>
          <Bet18Button onClick={() => { setFirstHalf({ pick: 1 }); openModal('1 to 18'); }}>1to18 </Bet18Button>
          <Bet18Button onClick={() => { setFirstHalf({ pick: 2 }); openModal('19 to 36'); }}>19to36 </Bet18Button>
        </Bet18Grid>

        <BetRowGrid>
          <BetRowButton onClick={() => { setNumRow({ pick: 1 }); openModal('1st row'); }}>2to1 - 1s row </BetRowButton>
          <BetRowButton onClick={() => { setNumRow({ pick: 2 }); openModal('2nd row'); }}>2to1 - 2s row </BetRowButton>
          <BetRowButton onClick={() => { setNumRow({ pick: 3 }); openModal('3rd row'); }}>2to1 - 3s row </BetRowButton>
        </BetRowGrid>

        {/* display of current bets if no visuals to show what has been checked */}
        <div>Your current bets:

          {num.pick && num.bet ? `$${num.bet} on ${num.pick}.` : null }&nbsp;

          {(color.pick && color.bet) ? `$${color.bet} on ${color.pick}.` : null}&nbsp;

          {(eO.pick && eO.bet) ? `$${eO.bet} on ${eO.pick}.` : null}&nbsp;

          {(rangeOf12.pick && rangeOf12.bet) ? `$${rangeOf12.bet} on ${rangeOf12.pick}.` : null}&nbsp;

          {(firstHalf.pick && firstHalf.bet) ? `$${firstHalf.bet} on ${firstHalf.pick}.` : null}&nbsp;

          {(numRow.pick && numRow.bet) ? `$${numRow.bet} on ${numRow.pick}.` : null}&nbsp;

          </div>
      </BetTableContainer>
    </div>

  );
}
