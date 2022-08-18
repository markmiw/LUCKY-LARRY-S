import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  GreenWhiteButton,
  YellowOrangeButton,
  PinkRedButton,
  BlueBlackButton,
  GreenBlackButton,
  BlueAquaButton,
  BlueLightBlueButton,
  LightPurplePulpleButton,
  PurplePinkButton,
} from '../shared/button.styled';

export default function PlayInputs({
  setPlays,
  betAmount,
  setBetAmount,
  play,
}) {
  const [selected, setSelected] = useState(0);
  function handleClick(numLines) {
    setPlays(numLines);
    setSelected(numLines.toString());
  }
  return (
    <InputsContainer>
      <TopRowContainer>
        <YellowOrangeButtonV2 id="1" selected={selected} type="button" onClick={() => handleClick(1)}>
          1 Line
        </YellowOrangeButtonV2>
      </TopRowContainer>
      <TopRowContainer>
        <YellowOrangeButtonV2 id="2" selected={selected} type="button" onClick={() => handleClick(2)}>
          2 Lines
        </YellowOrangeButtonV2>
      </TopRowContainer>
      <TopRowContainer>
        <YellowOrangeButtonV2 id="3" selected={selected} type="button" onClick={() => handleClick(3)}>
          3 Lines
        </YellowOrangeButtonV2>
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
