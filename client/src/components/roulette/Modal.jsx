/* eslint-disable no-alert */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import alertify from 'alertifyjs';
import Modal from '../modal/Modal';
import { CloseButton, CloseText } from '../shared/button.styled';

export default function RouletteModal({
  showModal,
  setShowModal,
  currentBetOption,
  setNum,
  setColor,
  setEO,
  setFirstHalf,
  setNumRow,
  setRangeOf12,
  num,
  color,
  eO,
  rangeOf12,
  firstHalf,
  numRow,
  betInput,
  setBetInput,
}) {
  const [betAmount, setBetAmount] = useState(0);
  const placeholderText = `Place your bet on ${currentBetOption}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (betAmount >= 1) {
      if (currentBetOption === 'red' || currentBetOption === 'black') {
        setColor({ ...color, bet: betAmount });
      } else if (currentBetOption === 'even' || currentBetOption === 'odd') {
        setEO({ ...eO, bet: betAmount });
      } else if (currentBetOption === '1st dozen' || currentBetOption === '2nd dozen' || currentBetOption === '3rd dozen') {
        setRangeOf12({ ...rangeOf12, bet: betAmount });
      } else if (currentBetOption === '1 to 18' || currentBetOption === '19 to 36') {
        setFirstHalf({ ...firstHalf, bet: betAmount });
      } else if (currentBetOption === '1st row' || currentBetOption === '2nd row' || currentBetOption === '3rd row') {
        setNumRow({ ...numRow, bet: betAmount });
      } else {
        setNum({ ...num, bet: betAmount });
      }
      setBetInput(!betInput);
      alertify.success(`Placed a bet of $${betAmount}`);
      // turn off modal after submitting bet
      setShowModal((prev) => !prev);
    } else {
      alertify.error('Please enter a bet');
    }
    setBetAmount(0);
  };

  return (
    <div>
      {showModal
        ? (
          <Modal>
            <div className="modal-header text-center" style={{ width: '100%' }}>
              <h4 className="modal-title w-100 font-weight-bold" style={{ color: 'white', marginLeft: '30px' }}>
                Place your bet
              </h4>
              <CloseButton
                type="button"
                className="close"
                onClick={() => setShowModal(false)}
              >
                <CloseText aria-hidden="true">&times;</CloseText>
              </CloseButton>
            </div>
            <div className="modal-body mx-3">
              <ModalForm onSubmit={(event) => handleSubmit(event)}>
                <input id="betAmount" type="text" placeholder={placeholderText} onChange={(event) => setBetAmount(event.target.value)} required />
                <button type="submit" onClick={(e) => handleSubmit(e)}>Submit Bet</button>
              </ModalForm>
            </div>
          </Modal>
        )
        : null}
    </div>
  );
}

RouletteModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
  currentBetOption: PropTypes.string.isRequired,
  setNum: PropTypes.func.isRequired,
  setColor: PropTypes.func.isRequired,
  setEO: PropTypes.func.isRequired,
  setFirstHalf: PropTypes.func.isRequired,
  setNumRow: PropTypes.func.isRequired,
  setRangeOf12: PropTypes.func.isRequired,
  num: PropTypes.shape({ pick: PropTypes.string }).isRequired,
  color: PropTypes.shape({ pick: PropTypes.string }).isRequired,
  eO: PropTypes.shape({ pick: PropTypes.string }).isRequired,
  rangeOf12: PropTypes.shape({ pick: PropTypes.string }).isRequired,
  firstHalf: PropTypes.shape({ pick: PropTypes.string }).isRequired,
  numRow: PropTypes.shape({ pick: PropTypes.string }).isRequired,
  betInput: PropTypes.bool.isRequired,
  setBetInput: PropTypes.func.isRequired,
};

export const ModalWrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr 2fr;
  background: transparent;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%);
  min-width: 26rem;
  // max-width: 100%;
  z-index: 11;
  height: 300px;
  margin-top: -300px;
`;

export const ModalForm = styled.form`
  z-index: 11;
  color: black;
`;

export const CloseModalButton = styled.button`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  padding: 0;
  z-index: 10;
`;

export const ModalWrapperStyled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 11;
  perspective: 5.5cm;
`;

export const ModalBackgroundStyled = styled.div`
  background: rgba(250, 250, 250, 0.3);
  backdrop-filter: blur(2px);
  position: fixed;
  top: 0;
  left:0;
  right:0;
  bottom: 0;
  z-index: 10;
`;

export const ModalInnerStyled = styled.div`
  max-width: 80%;
  max-height: 40%;
  margin: 0 auto;
`;

export const CloseButtonStyled = styled.button`
  background: none;
  top: 20px;
  right: 20px;
  width: 32px;
  padding: 0;
  border-radius: 50%;
  border: none;
  position: absolute;
  z-index: 14;
  &:hover {
    cursor: pointer;
  }
`;
