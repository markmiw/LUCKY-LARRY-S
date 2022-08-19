/* eslint-disable object-shorthand */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Modal from './Modal';
import { GreenWhiteButton, YellowOrangeButton, PinkRedButton, BlueBlackButton, GreenBlackButton, BlueAquaButton, BlueLightBlueButton, LightPurplePulpleButton, PurplePinkButton } from '../shared/button.styled.js';

export default function BetTable({ setBetInfo, spin }) {
  // userbet refactor to remove initial pick bets
  const [num, setNum] = useState({ pick: '', bet: '' });
  const [color, setColor] = useState({ pick: '', bet: '' });
  const [eO, setEO] = useState({ pick: '', bet: '' });
  const [rangeOf12, setRangeOf12] = useState({ pick: '', bet: '' });
  const [firstHalf, setFirstHalf] = useState({ pick: '', bet: '' });
  const [numRow, setNumRow] = useState({ pick: '', bet: '' });
  // modal props
  const [showModal, setShowModal] = useState(false);
  const [currentBetOption, setCurrentBetOption] = useState('');
  const [betInput, setBetInput] = useState(false);

  // updates state for roulette wheel
  useEffect(() => {
    setBetInfo({
      num: num, col: color, eO: eO, rangeOf12: rangeOf12, firstHalf: firstHalf, numRow: numRow,
    });
  }, [betInput]);

  // resets bets on spin
  useEffect(() => {
    setNum({ pick: '', bet: '' });
    setColor({ pick: '', bet: '' });
    setEO({ pick: '', bet: '' });
    setRangeOf12({ pick: '', bet: '' });
    setFirstHalf({ pick: '', bet: '' });
    setNumRow({ pick: '', bet: '' });
  }, [spin]);

  const openModal = (input) => {
    setShowModal((prev) => !prev);
    setCurrentBetOption(input);
  };

  return (
    <div>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        currentBetOption={currentBetOption}
        setNum={setNum}
        setColor={setColor}
        setEO={setEO}
        setFirstHalf={setFirstHalf}
        setNumRow={setNumRow}
        setRangeOf12={setRangeOf12}
        num={num}
        color={color}
        eO={eO}
        rangeOf12={rangeOf12}
        firstHalf={firstHalf}
        numRow={numRow}
        betInput={betInput}
        setBetInput={setBetInput}
      />
      <BetTableContainer>
        <GreenWhiteButton onClick={() => { setNum(0); openModal('0'); }}>
          0
        </GreenWhiteButton>
        <BetNumberGrid>
          {[...Array(36)].map((rouletteNum, index) => {
            const val = index + 1;
            return (
              <YellowOrangeButton key={index} onClick={() => { setNum({ pick: val }); openModal(`${val}`); }}>
                {val}
                &nbsp;
              </YellowOrangeButton>
            );
          })}
        </BetNumberGrid>
        <BetColorOddGrid>
          <PinkRedButton onClick={() => { setColor({ pick: 'red' }); openModal('red') }}>Red</PinkRedButton>
          <BlueBlackButton onClick={() => { setColor({ pick: 'black' }); openModal('black') }}>Black</BlueBlackButton>
          <BlueAquaButton onClick={() => { setEO({ pick: 'even' }); openModal('even'); }}>Even</BlueAquaButton>
          <GreenBlackButton onClick={() => { setEO({ pick: 'odd' }); openModal('odd'); }}>Odd</GreenBlackButton>
        </BetColorOddGrid>

        <Bet12Grid>
          <BlueLightBlueButton onClick={() => { setRangeOf12({ pick: 1 }); openModal('1st dozen'); }}>1st12 </BlueLightBlueButton>
          <BlueLightBlueButton onClick={() => { setRangeOf12({ pick: 2 }); openModal('2nd dozen'); }}>2nd12 </BlueLightBlueButton>
          <BlueLightBlueButton onClick={() => { setRangeOf12({ pick: 3 }); openModal('3rd dozen'); }}>3rd12 </BlueLightBlueButton>
        </Bet12Grid>

        <Bet18Grid>
          <LightPurplePulpleButton onClick={() => { setFirstHalf({ pick: 1 }); openModal('1 to 18'); }}>1to18 </LightPurplePulpleButton>
          <LightPurplePulpleButton onClick={() => { setFirstHalf({ pick: 2 }); openModal('19 to 36'); }}>19to36 </LightPurplePulpleButton>
        </Bet18Grid>

        <BetRowGrid>
          <PurplePinkButton onClick={() => { setNumRow({ pick: 1 }); openModal('1st row'); }}>1s row </PurplePinkButton>
          <PurplePinkButton onClick={() => { setNumRow({ pick: 2 }); openModal('2nd row'); }}>2s row </PurplePinkButton>
          <PurplePinkButton onClick={() => { setNumRow({ pick: 3 }); openModal('3rd row'); }}>3s row </PurplePinkButton>
        </BetRowGrid>

        <div>
          Your current bets:
          {num.pick && num.bet ? `$${num.bet} on ${num.pick}.` : null}
          &nbsp;
          {(color.pick && color.bet) ? `$${color.bet} on ${color.pick}.` : null}
          &nbsp;
          {(eO.pick && eO.bet) ? `$${eO.bet} on ${eO.pick}.` : null}
          &nbsp;
          {(rangeOf12.pick && rangeOf12.bet) ? `$${rangeOf12.bet} on ${rangeOf12.pick === 1 ? '1st dozen' : rangeOf12.pick === 2 ? '2nd dozen' : rangeOf12.pick === 3 ? '3rd dozen' : null}.` : null}
          &nbsp;
          {(firstHalf.pick && firstHalf.bet) ? `$${firstHalf.bet} on ${firstHalf.pick === 1 ? '1to18' : firstHalf.pick === 2 ? '19to36' : null}.` : null}
          &nbsp;
          {(numRow.pick && numRow.bet) ? `$${numRow.bet} on ${numRow.pick === 1 ? '1s row' : numRow.pick === 2 ? '2s row' : numRow.pick === 3 ? '3s row' : null}.` : null}
          &nbsp;
        </div>
      </BetTableContainer >
    </div >
  );
}

BetTable.propTypes = { setBetInfo: PropTypes.func.isRequired };

export const RouletteInfo1Grid = styled.div`
  display: grid;
  max-width: 100%;
  margin: 0 auto;
  grid-template-columns: auto auto auto;
  gap: 5%;
`;
export const GameDisplay = styled.div`
  margin: 0 auto;
  width: 300px;
  height: 30px;
`;

export const BetTableContainer = styled.div`
  margin: 0 auto;
  @media (min-width: 501px) {
    max-width: 100%;
  }
  @media (max-width: 500px) {
    width: 380px;
  }
`;
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
`;

export const BetColorOddGrid = styled.div`
  display: grid;
  max-width: 100%;
  margin: 0 auto;
  grid-template-columns: auto auto auto auto;
`;

export const Bet12Grid = styled.div`
  display: grid;
  max-width: 100%;
  margin: 0 auto;
  grid-template-columns: auto auto auto;
`;

export const Bet18Grid = styled.div`
  display: grid;
  max-width: 100%;
  margin: 0 auto;
  grid-template-columns: auto auto;
`;

export const BetRowGrid = styled.div`
  display: grid;
  max-width: 100%;
  margin: 0 auto;
  grid-template-columns: auto auto auto;
`;