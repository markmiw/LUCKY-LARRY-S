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

export default function Modal({ showModal, setShowModal, currentBetOption, betAmount, setBetAmount }) {


  const handleSubmit = () => {
    event.preventDefault();
    // need to pass this betting information to somewhere
    // betAmount here is the current bet on the current amount
    if (betAmount > 0) {
      console.log('current bet is: ', betAmount);
      alert('You have successfully bet on this option')
      document.getElementById("betAmount").value = "";
    } else {
      alert('Please put the amount you want to bet on this option')
    }

  }

  return (
    <div>
      {showModal ?
        <ModalWrapperStyled>
          <ModalWrapper>
            <CloseButtonStyled type="button" onClick={() => setShowModal(prev => !prev)}>X</CloseButtonStyled>
            <ModalHeaderInnerStyled style={{ color: 'blue', lineHeight : 10}}> You can bet $1, $5, $10, $20, $50, $100 on {currentBetOption}</ModalHeaderInnerStyled>
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