import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export default function PlayInputs({
  setPlays,
  betAmount,
  setBetAmount,
  play,
}) {
  return (
    <InputsContainer>
      <TopRowContainer>
        <button type="button" onClick={() => setPlays(1)}>
          1 Line
        </button>
      </TopRowContainer>
      <TopRowContainer>
        <button type="button" onClick={() => setPlays(2)}>
          2 Lines
        </button>
      </TopRowContainer>
      <TopRowContainer>
        <button type="button" onClick={() => setPlays(3)}>
          3 Lines
        </button>
      </TopRowContainer>
      <BottomRowContainer>
        <Bets>
          <Dollar>
            $
          </Dollar>
          <StyledInput type="number" value={betAmount} placeholder="1" onChange={(event) => setBetAmount(event.target.value)} />
        </Bets>
      </BottomRowContainer>
      <BottomRowContainer>
        <button
          type="button"
          onClick={play}
        >
          Go!
        </button>
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
`;

const TopRowContainer = styled.div`
  grid-column-end: span 2;
  padding: 5px;
`;

const BottomRowContainer = styled.div`
  grid-column-end: span 3;
  padding: 5px;
`;

const Bets = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledInput = styled.input`
  margin: 0;
  margin-left: 5px;
  border-radius: 10px;
  text-align: center;
`;

const Dollar = styled.div`
  font-size: x-large;
`;
