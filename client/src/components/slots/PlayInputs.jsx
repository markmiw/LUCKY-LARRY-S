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
}) {
  return (
    <InputsContainer>
      <TopRowContainer>
        <YellowOrangeButton type="button" onClick={() => setPlays(1)}>
          1 Line
        </YellowOrangeButton>
      </TopRowContainer>
      <TopRowContainer>
        <YellowOrangeButton type="button" onClick={() => setPlays(2)}>
          2 Lines
        </YellowOrangeButton>
      </TopRowContainer>
      <TopRowContainer>
        <YellowOrangeButton type="button" onClick={() => setPlays(3)}>
          3 Lines
        </YellowOrangeButton>
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
