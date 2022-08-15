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



export default function Modal({ showModal, setShowModal }) {
  const [betAmount, setBetAmount] = useState(0);

  return (
    <div>
      {showModal ?
        <ModalWrapperStyled>
          <ModalWrapper>
            model open test
            <CloseButtonStyled type="button" onClick={() => setShowModal(prev => !prev)}>X</CloseButtonStyled>
            <ModalHeaderInnerStyled style={{ color: 'blue', lineHeight : 10}}>Please enter your bet amount. You can bet $1, $5, $10, $20, $50, $100 on this option</ModalHeaderInnerStyled>
            <ModalForm>
              <input id="betAmount" type="text" placeholder="place bet amount here" onChange={() => { setBetAmount(event.target.value); console.log('amount recorded', event.target.value) }} required />
            </ModalForm>
          </ModalWrapper>
          <ModalBackgroundStyled />
        </ModalWrapperStyled>
        : null}
    </div>
  )
}