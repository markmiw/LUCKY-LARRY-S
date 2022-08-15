// this is the share game model pop up
import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import {
  ModalWrapper, ModalForm, CloseModalButton, ModalWrapperStyled,
  ModalBackgroundStyled,
  ModalInnerStyled,
  ModalContentStyled,
  CloseButtonStyled,
  CloseButtonExpandedStyled, ModalHeaderInnerStyled
} from './roulette.styled.js';

export default function Modal({ showModal, setShowModal, currentBetOption, setNum, setColor, setEO, setFirstHalf, setNumRow, setRangeOf12, num, color, eO, rangeOf12, firstHalf, numRow, betInput, setBetInput }) {
  const [betAmount, setBetAmount] = useState(0);

  const handleSubmit = () => {
    event.preventDefault();
    // need to pass this betting information to somewhere
    // betAmount here is the current bet on the current amount
    if (betAmount > 0) {
      //to potentially convert to switches or refactor later with a useEffect
      console.log('currentBetOption: ', currentBetOption)
      if (currentBetOption === 'red' || currentBetOption ===  'black') {
        console.log('inside colors')
        setColor({ ...color, bet: betAmount })
      } else if (currentBetOption === 'even' || currentBetOption === 'odd') {
        console.log('inside even/odd')
        setEO({...eO, bet: betAmount })
      } else if (currentBetOption === '1st dozen' || currentBetOption === '2nd dozen' || currentBetOption === '3rd dozen') {
        setRangeOf12({...rangeOf12, bet: betAmount })
      } else if (currentBetOption === '1 to 18' || currentBetOption === '19 to 36') {
        setFirstHalf({...firstHalf, bet: betAmount })
      } else if (currentBetOption === '1st row'|| currentBetOption === '2nd row' || currentBetOption === '3rd row') {
        console.log('inside rows')
        setNumRow({...numRow, bet: betAmount })
      } else {
        console.log('inside numbers')
        setNum({ ...num, bet: betAmount })
      }
        setBetInput(!betInput);
        console.log('current bet/betAmount is: ', num, betAmount);
        alert('You have successfully bet on this option')
        document.getElementById("betAmount").value = "";
      } else {
        alert('Please put the amount you want to bet on this option')
      }
      // reset betAmount
      setBetAmount(0);

    }

    return (
      <div>
        {showModal ?
          <ModalWrapperStyled>
            <ModalWrapper>
              <CloseButtonStyled type="button" onClick={() => setShowModal(prev => !prev)}>X</CloseButtonStyled>
              <ModalHeaderInnerStyled style={{ color: 'blue', lineHeight: 10 }}> You can bet $1, $5, $10, $20, $50, $100 on {currentBetOption}</ModalHeaderInnerStyled>
              <ModalForm onSubmit={(event) => handleSubmit(event)}>
                <input id="betAmount" type="text" placeholder="place bet amount here" onChange={() => { setBetAmount(event.target.value); console.log('amount recorded', event.target.value) }} required />
                <button onClick={() => handleSubmit()}>Submit Bet</button>
              </ModalForm>
            </ModalWrapper>
            <ModalBackgroundStyled />
          </ModalWrapperStyled>
          : null}
      </div>
    )

  }