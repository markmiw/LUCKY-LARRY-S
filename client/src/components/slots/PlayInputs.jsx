import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  GreenWhiteButton,
  YellowOrangeButton,
} from '../shared/button.styled';

export default function PlayInputs({
  setPlays,
  betAmount,
  setBetAmount,
  play,
  plays,
}) {
  function handleClick(numLines) {
    setPlays(numLines);
  }
  return (
    <InputsContainer>
      <TopRowContainer>
        <YellowOrangeButtonV2 id="1" selected={plays.toString()} type="button" onClick={() => handleClick(1)}>
          1 Line
        </YellowOrangeButtonV2>
      </TopRowContainer>
      <TopRowContainer>
        <YellowOrangeButtonV2 id="2" selected={plays.toString()} type="button" onClick={() => handleClick(2)}>
          2 Lines
        </YellowOrangeButtonV2>
      </TopRowContainer>
      <TopRowContainer>
        <YellowOrangeButtonV2 id="3" selected={plays.toString()} type="button" onClick={() => handleClick(3)}>
          3 Lines
        </YellowOrangeButtonV2>
      </TopRowContainer>
      <BottomRowContainer>
        <StyledInput
          type="text"
          value={`$${betAmount}`}
          onChange={(event) => {
            if (event.target.value === '') {
              setBetAmount('');
              return;
            }
            const afterDollar = event.target.value.split('$')[1];
            const digits = afterDollar.split(/[^0-9]/).join('');
            setBetAmount(digits);
          }}
        />
      </BottomRowContainer>
      <BottomRowContainer>
        <GreenWhiteButton
          type="button"
          onClick={play}
        >
          Go!
        </GreenWhiteButton>
      </BottomRowContainer>
    </InputsContainer>
  );
}

PlayInputs.propTypes = {
  setPlays: PropTypes.func.isRequired,
  betAmount: PropTypes.string.isRequired,
  setBetAmount: PropTypes.func.isRequired,
  play: PropTypes.func.isRequired,
  plays: PropTypes.number.isRequired,
};

const InputsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  margin-top: 50px;
`;

const TopRowContainer = styled.div`
  grid-column-end: span 2;
  padding: 5px;
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

const BottomRowContainer = styled.div`
  grid-column-end: span 3;
  padding: 5px;
`;

const StyledInput = styled.input`
  height: 100%;
  margin: 0;
  background-image: linear-gradient(to right,#6dcfa4,#178a80);
  width: 100%;
  border: solid #165e58;
  border-radius: 16px;
  border-width: 0 0 4px;
  color: white;
  text-align: center;
  font-family: din-round,sans-serif;
  font-size: 15px;
  font-weight: 700;
`;
