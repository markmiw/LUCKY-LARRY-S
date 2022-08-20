import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  GreenWhiteButton,
  YellowOrangeButton,
  StyledInputContainer,
  StyledInputSpan,
  StyledInput,
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
      <TopRowContainer>
        <StyledInputContainer>
          <StyledInputSpan>
            BET:
            &nbsp;
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
        </StyledInputContainer>
      </TopRowContainer>
      <TopRowContainer>
        <StyledInputContainer>
          <StyledInputSpan
            style={{
              textAlign: 'center',
            }}
          >
            TOTAL BET:
            &nbsp;
            {`$${plays * betAmount}`}
          </StyledInputSpan>
        </StyledInputContainer>
      </TopRowContainer>
      <TopRowContainer>
        <GreenWhiteButton
          type="button"
          onClick={play}
        >
          Go!
        </GreenWhiteButton>
      </TopRowContainer>
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
