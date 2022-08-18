import React from 'react';
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
        <StyledInputContainer>
          <StyledInputSpan>
            $
          </StyledInputSpan>
          <StyledInput
            type="text"
            value={`${betAmount}`}
            onChange={(event) => {
              const digits = event.target.value.split(/[^0-9]/).join('');
              // max length 5 chars
              setBetAmount(digits.slice(0, 5));
            }}
          />
          &nbsp;
          <StyledInputSpan>
            {/* {`= $${plays * Number(betAmount)}`} */}
            {`× ${plays} =`}
          </StyledInputSpan>
          &nbsp;
          <StyledResult>
            {
              betAmount === ''
                ? '$'
                : `$${plays * Number(betAmount)}`
            }
          </StyledResult>
        </StyledInputContainer>
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

const StyledInputContainer = styled.div`
  height: 100%;
  margin: 0;
  background-image: linear-gradient(to right,#6dcfa4,#178a80);
  width: 100%;
  border: solid #165e58;
  border-radius: 16px;
  border-width: 0 0 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
`;

const inputText = `
  color: white;
  font-family: din-round,sans-serif;
  font-size: 15px;
  font-weight: 700;
`;

const StyledInputSpan = styled.span`
  ${inputText}
`;

const StyledInput = styled.input`
  ${inputText}
  border: 0;
  height: 15px;
  width: 5ch;
  padding: 0;
  background-color: transparent;
  border-bottom: 1px solid rgba(255, 255, 255, .5);
  text-align: center;
`;

const StyledResult = styled.span`
  user-select: none;
  ${inputText}
  width: 5ch;
`;
