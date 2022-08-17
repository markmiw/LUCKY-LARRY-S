import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal.jsx';
import styled from 'styled-components';
// import { RouletteInfo1Grid, GameDisplay, BetTableContainer, BetNumberGrid, Number0Button, NumberButton, BetColorOddGrid, RedColorButton, BlackColorButton, Bet12Grid, Bet12Button, Bet18Grid, Bet18Button, BetRowGrid, BetRowButton } from './roulette.styled.js';

export default function BetTable({ setResult, setBetInfo }) {
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
    setBetInfo({num: num, col: color, eO: eO, rangeOf12: rangeOf12, firstHalf: firstHalf, numRow: numRow})
  }, [betInput])

  // need a function that handles the amount bet pop upc

  const openModal = (input) => {
    setShowModal(prev => !prev); // prev => !prev
    setCurrentBetOption(input)
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
          <EvenColorButton onClick={() => { setEO({ pick: 'odd' }); openModal('odd'); }}>Even</EvenColorButton>
          <OddColorButton onClick={() => { setEO({ pick: 'even' }); openModal('even'); }}>Odd</OddColorButton>

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
          {(rangeOf12.pick && rangeOf12.bet) ? `$${rangeOf12.bet} on ${rangeOf12.pick === 1 ? '1st dozen' : rangeOf12.pick === 2 ? '2nd dozen' : rangeOf12.pick === 3 ? '3rd dozen' : null}.` : null}&nbsp;
          {(firstHalf.pick && firstHalf.bet) ? `$${firstHalf.bet} on ${firstHalf.pick === 1 ? '1to18' : firstHalf.pick === 2 ? '19to36' : null }.` : null}&nbsp;
          {(numRow.pick && numRow.bet) ? `$${numRow.bet} on ${numRow.pick === 1 ? '1s row': numRow.pick === 2 ? '2s row': numRow.pick === 3 ? '3s row':null}.` : null}&nbsp;
          </div>
      </BetTableContainer>
    </div>

  );
}

export const RouletteInfo1Grid = styled.div`
  display: grid;
  max-width: 100%;
  margin: 0 auto;
  grid-template-columns: auto auto auto;
  gap: 5%;
`
export const GameDisplay = styled.div`
  margin: 0 auto;
  width: 300px;
  height: 30px;
`


export const BetTableContainer = styled.div`
  margin: 0 auto;
`
export const BetNumberGrid = styled.div`
  display: grid;
  max-width: 100%;
  margin: 0 auto;
  @media (min-width: 501px) {
    grid-template-columns: auto auto auto auto auto auto auto auto auto auto auto auto;
  }
  @media (max-width: 500px) {
    grid-template-columns: auto auto auto auto auto auto;
  }
`
export const Number0Button = styled.button`
&:after {
  background-color: green;
  background-image: linear-gradient(to right, #4fe08e, green);

}
background-color: #0b6102;
`

export const NumberButton = styled.button`
&:after {
  background-color: #FDA300;
  background-image: linear-gradient(to right, #FDA300, #e0734f);
}
background-color: #E09F5A;
`
export const BetColorOddGrid = styled.div`
  display: grid;
  max-width: 100%;
  margin: 0 auto;
  grid-template-columns: auto auto auto auto;
`
export const RedColorButton = styled.button`
&:after {
  background-color: red;
  background-image: linear-gradient(to right, #e05d4f, red);

}
background-color: red;
`
export const BlackColorButton = styled.button`
&:after {
  background-color: black;
  background-image: linear-gradient(to right, #5882ad, #161a20);
}
background-color: black;
`

export const EvenColorButton = styled.button`
&:after {
  background-color: black;
  background-image: linear-gradient(to right, #6dcfa4, #178a80);
}
background-color: black;
`

export const OddColorButton = styled.button`
&:after {
  background-color: black;
  background-image: linear-gradient(to right, #0b8699, #68ded4);
}
background-color: black;
`

export const Bet12Grid = styled.div`
  display: grid;
  max-width: 100%;
  margin: 0 auto;
  grid-template-columns: auto auto auto;
`
export const Bet12Button = styled.button`
&:after {
  background-color: #327ba8;
  background-image: linear-gradient(to right, #1E2F97, #327ba8);
}
background-color: #1a4b82
`
export const Bet18Grid = styled.div`
  display: grid;
  max-width: 100%;
  margin: 0 auto;
  grid-template-columns: auto auto;

`
export const Bet18Button = styled.button`
&:after {
  background-color: #4ADEDE;
  background-image: linear-gradient(to right, #9c76cf, #631b8c);
}
background-color: #1AA7EC;
`
export const BetRowGrid = styled.div`
  display: grid;
  max-width: 100%;
  margin: 0 auto;
  grid-template-columns: auto auto auto;
`
export const BetRowButton = styled.button`
  &:after {
    background-color: #FDA300;
    background-image: linear-gradient(to right, #8c1b85, #b0548a);
  }
  background-color: #E09F5A;
`
