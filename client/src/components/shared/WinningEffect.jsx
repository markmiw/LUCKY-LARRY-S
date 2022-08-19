import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
// import AnimatedText from 'react-animated-text-content';
import styled from 'styled-components';
import { keyframes } from 'styled-components';

export default function WinningEffect() {
  return (
    <WinningEffectContainer>
      <AnimatedGradientText>
        Congradulations!! You won!!
      </AnimatedGradientText>
      <Confetti />
      <WinningBackground />
    </WinningEffectContainer>
  );
}

const gradient = keyframes`
{
0% {
  background-position: 0 ;
  transform: scale( .75 );
}
20%
{
  transform: scale( 1.1 );
}
40%
{
  transform: scale( .75 );
}
50% {
  background-position: 100% ;
}
60%
{
  transform: scale( 1.1 );
}
80%
{
  transform: scale( .75 );
}
100% {
  background-position: 0 50%;
  transform: scale( .75 );

}}
`;

const AnimatedGradientText = styled.div`
  padding-top: 10%;
  animation: ${gradient} 3s infinite;
  background: linear-gradient(90deg, #ff0000, #ffff00, #ff00f3, #0033ff, #ff00c4, #ff0000);
  background-size: 300%;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  @media (min-width: 501px) {
    font-size: 180px;
    font-weight: 600;
  }
  @media (max-width: 500px) {
    font-size: 70px;
  }
`;

export const WinningEffectContainer = styled.div`
position: fixed;
top: 0;
left: 0;
right: 0;
bottom: 0;
font-size: 6rem;
z-index: 20;
`;

export const WinningBackground = styled.div`
  background: rgba(250, 250, 250, 0.1);
  position: fixed;
  top: 0;
  left:0;
  right:0;
  bottom: 0;
  z-index: 19;
`;
