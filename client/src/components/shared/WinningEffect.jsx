import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { Wave } from 'react-animated-text';
import styled from 'styled-components';


export default function WinningEffect() {
  return (
    <WinningEffectContainer>
      <WinningText>
      <Wave
        text="Congratulations!! You won!!"
        effect="stretch"
        effectChange={2}
        textColor="white"
        />
      </WinningText>
      <Confetti />
      <WinningBackground />
    </WinningEffectContainer>
  )
}

export const WinningText = styled.div`
  display: grid;
  grid-template-rows: auto;
  margin: 0 auto;
  color: red;
`

export const WinningEffectContainer = styled.div`
position: fixed;
top: 0;
left: 0;
right: 0;
bottom: 0;
font-size: 6rem;
z-index: 20;
`

export const WinningBackground = styled.div`
  background: rgba(250, 250, 250, 0.1);
  position: fixed;
  top: 0;
  left:0;
  right:0;
  bottom: 0;
  z-index: 19;
`;