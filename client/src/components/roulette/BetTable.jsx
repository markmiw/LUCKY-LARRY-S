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
    setBetInfo('');
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
              <YellowOrangeButtonV2 key={index} id={index} selected={num.pick - 1} onClick={() => { setNum({ pick: val }); openModal(`${val}`); }}>
                {val}
                &nbsp;
              </YellowOrangeButtonV2>
            );
          })}
        </BetNumberGrid>
        <BetColorOddGrid>
          <PinkRedButtonV2 id="red" selected={color.pick} onClick={() => { setColor({ pick: 'red' }); openModal('red')}}>Red</PinkRedButtonV2>
          <BlueBlackButtonV2 id="black" selected={color.pick} onClick={() => { setColor({ pick: 'black' }); openModal('black')}}>Black</BlueBlackButtonV2>
          <BlueAquaButtonV2 id="even" selected={eO.pick} onClick={() => { setEO({ pick: 'even' }); openModal('even'); }}>Even</BlueAquaButtonV2>
          <GreenBlackButtonV2 id="odd" selected={eO.pick} onClick={() => { setEO({ pick: 'odd' }); openModal('odd'); }}>Odd</GreenBlackButtonV2>
        </BetColorOddGrid>

        <Bet12Grid>
          <BlueLightBlueButtonV2 id={1} selected={rangeOf12.pick} onClick={() => { setRangeOf12({ pick: 1 }); openModal('1st dozen'); }}>1st12 </BlueLightBlueButtonV2>
          <BlueLightBlueButtonV2 id={2} selected={rangeOf12.pick} onClick={() => { setRangeOf12({ pick: 2 }); openModal('2nd dozen'); }}>2nd12 </BlueLightBlueButtonV2>
          <BlueLightBlueButtonV2 id={3} selected={rangeOf12.pick} onClick={() => { setRangeOf12({ pick: 3 }); openModal('3rd dozen'); }}>3rd12 </BlueLightBlueButtonV2>
        </Bet12Grid>

        <Bet18Grid>
          <LightPurplePulpleButtonV2 id={1} selected={firstHalf.pick} onClick={() => { setFirstHalf({ pick: 1 }); openModal('1 to 18'); }}>1to18 </LightPurplePulpleButtonV2>
          <LightPurplePulpleButtonV2 id={2} selected={firstHalf.pick} onClick={() => { setFirstHalf({ pick: 2 }); openModal('19 to 36'); }}>19to36 </LightPurplePulpleButtonV2>
        </Bet18Grid>

        <BetRowGrid>
          <PurplePinkButtonV2 id={1} selected={numRow.pick} onClick={() => { setNumRow({ pick: 1 }); openModal('1st row'); }}>1s row </PurplePinkButtonV2>
          <PurplePinkButtonV2 id={2} selected={numRow.pick} onClick={() => { setNumRow({ pick: 2 }); openModal('2nd row'); }}>2s row </PurplePinkButtonV2>
          <PurplePinkButtonV2 id={3} selected={numRow.pick} onClick={() => { setNumRow({ pick: 3 }); openModal('3rd row'); }}>3s row </PurplePinkButtonV2>
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
      </BetTableContainer>
    </div>
  );
}

BetTable.propTypes = { setBetInfo: PropTypes.func.isRequired };

const GreenWhiteButtonV2 = styled(GreenWhiteButton)`
  background-color: ${(props) => (props.id === props.selected) && '#7ed5e5'};
  border-style: ${(props) => (props.id === props.selected) && 'solid'};
  border-color: ${(props) => (props.id === props.selected) && 'white'};
  border-width: ${(props) => (props.id === props.selected) && '3px'};
  &:after {
    ${(props) => (props.id === props.selected) && 'background-image: linear-gradient(to right,#007ed5,#2accc8)'};
  }
`;

const YellowOrangeButtonV2 = styled(YellowOrangeButton)`
  background-color: ${(props) => (props.id === props.selected) && '#7ed5e5'};
  border-style: ${(props) => (props.id === props.selected) && 'solid'};
  border-color: ${(props) => (props.id === props.selected) && 'white'};
  border-width: ${(props) => (props.id === props.selected) && '3px'};
  &:after {
    ${(props) => (props.id === props.selected) && 'background-image: linear-gradient(to right,#007ed5,#2accc8)'};
  }
`;

const PinkRedButtonV2 = styled(PinkRedButton)`
  background-color: ${(props) => (props.id === props.selected) && '#7ed5e5'};
  border-style: ${(props) => (props.id === props.selected) && 'solid'};
  border-color: ${(props) => (props.id === props.selected) && 'white'};
  border-width: ${(props) => (props.id === props.selected) && '3px'};
  &:after {
    ${(props) => (props.id === props.selected) && 'background-image: linear-gradient(to right,#007ed5,#91fdff)'};
  }
`;

const BlueBlackButtonV2 = styled(BlueBlackButton)`
  background-color: ${(props) => (props.id === props.selected) && '#7ed5e5'};
  border-style: ${(props) => (props.id === props.selected) && 'solid'};
  border-color: ${(props) => (props.id === props.selected) && 'white'};
  border-width: ${(props) => (props.id === props.selected) && '3px'};
  &:after {
    ${(props) => (props.id === props.selected) && 'background-image: linear-gradient(to right,#007ed5,#91fdff)'};
  }
`;
const BlueAquaButtonV2 = styled(BlueAquaButton)`
  background-color: ${(props) => (props.id === props.selected) && '#7ed5e5'};
  border-style: ${(props) => (props.id === props.selected) && 'solid'};
  border-color: ${(props) => (props.id === props.selected) && 'white'};
  border-width: ${(props) => (props.id === props.selected) && '3px'};
  &:after {
    ${(props) => (props.id === props.selected) && 'background-image: linear-gradient(to right,#007ed5,#91fdff)'};
  }
`;
const GreenBlackButtonV2 = styled(GreenBlackButton)`
  background-color: ${(props) => (props.id === props.selected) && '#7ed5e5'};
  border-style: ${(props) => (props.id === props.selected) && 'solid'};
  border-color: ${(props) => (props.id === props.selected) && 'white'};
  border-width: ${(props) => (props.id === props.selected) && '3px'};
  &:after {
    ${(props) => (props.id === props.selected) && 'background-image: linear-gradient(to right,#007ed5,#91fdff)'};
  }
`;
const BlueLightBlueButtonV2 = styled(BlueLightBlueButton)`
  background-color: ${(props) => (props.id === props.selected) && '#7ed5e5'};
  border-style: ${(props) => (props.id === props.selected) && 'solid'};
  border-color: ${(props) => (props.id === props.selected) && 'white'};
  border-width: ${(props) => (props.id === props.selected) && '3px'};
  &:after {
    ${(props) => (props.id === props.selected) && 'background-image: linear-gradient(to right,#007ed5,#91fdff)'};
  }
`;
const LightPurplePulpleButtonV2 = styled(LightPurplePulpleButton)`
  background-color: ${(props) => (props.id === props.selected) && '#7ed5e5'};
  border-style: ${(props) => (props.id === props.selected) && 'solid'};
  border-color: ${(props) => (props.id === props.selected) && 'white'};
  border-width: ${(props) => (props.id === props.selected) && '3px'};
  &:after {
    ${(props) => (props.id === props.selected) && 'background-image: linear-gradient(to right,#007ed5,#91fdff)'};
  }
`;
const PurplePinkButtonV2 = styled(PurplePinkButton)`
  background-color: ${(props) => (props.id === props.selected) && '#7ed5e5'};
  border-style: ${(props) => (props.id === props.selected) && 'solid'};
  border-color: ${(props) => (props.id === props.selected) && 'white'};
  border-width: ${(props) => (props.id === props.selected) && '3px'};
  &:after {
    ${(props) => (props.id === props.selected) && 'background-image: linear-gradient(to right,#007ed5,#91fdff)'};
  }
`;

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