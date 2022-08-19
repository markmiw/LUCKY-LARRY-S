/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable object-shorthand */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import alertify from 'alertifyjs';
import { Wheel } from 'react-custom-roulette';
import styled from 'styled-components';
import Confetti from 'react-confetti';

import WinningEffect from '../shared/WinningEffect';

const data = [
  { option: '0', style: { backgroundColor: 'green' } },
  { option: '32' },
  { option: '15' },
  { option: '19' },
  { option: '4' },
  { option: '21' },
  { option: '2' },
  { option: '25' },
  { option: '17' },
  { option: '34' },
  { option: '6' },
  { option: '27' },
  { option: '13' },
  { option: '36' },
  { option: '11' },
  { option: '30' },
  { option: '8' },
  { option: '23' },
  { option: '10' },
  { option: '5' },
  { option: '24' },
  { option: '16' },
  { option: '33' },
  { option: '1' },
  { option: '20' },
  { option: '14' },
  { option: '31' },
  { option: '9' },
  { option: '22' },
  { option: '18' },
  { option: '29' },
  { option: '7' },
  { option: '28' },
  { option: '12' },
  { option: '35' },
  { option: '3' },
  { option: '26' },
];

const backgroundColors = ['#e34b49', '#161a20'];
const textColors = ['white'];
const outerBorderColor = '#fdcc14';
const outerBorderWidth = 18;
const innerBorderColor = '#161a20';
const innerBorderWidth = 29;
const innerRadius = 42;
const radiusLineColor = '#e3c13b';
const radiusLineWidth = 4;
const fontSize = 17;
const textDistance = 77;
const spinDuration = 1.0;

export default function RouletteWheel({
  betInfo, user, setUser, spin, setSpin,
}) {
  // wheel functionality
  const [mustSpin, setMustSpin] = useState(false);
  const [winData, setWinData] = useState({});
  const [winState, setWinState] = useState(false);

  console.log('betInfo is: ', betInfo);

  const handleSpinClick = () => {
    if (betInfo === '') {
      alertify.error('Please place a bet');
    } else {
      axios.get('/api/roulette', {
        params: {
          betInfo: betInfo,
          user: user,
        },
      })
        .then((response) => {
          if (response.data.status === 'Insufficient Funds.') {
            alertify.error(response.data.status);
            return;
          }
          if (response.data.status === 'No bet was made.') {
            alertify.error(response.data.status);
            return;
          }
          let betAmount = 0;
          Object.entries(betInfo).forEach(([key, value]) => {
            betAmount += Number(value.bet);
          });
          const updatedBalance = user.balance - betAmount;
          setUser({ ...user, balance: updatedBalance });
          setWinData(response.data);
          setMustSpin(true);
        });
    }
  };

  // show winning effect for only 10 seconds
  const winningEffect = () => {
    setTimeout(() => {
      setWinState(false);
    }, 4000);
  };

  useEffect(winningEffect, [winState]);

  return (
    <RouletteWheelContainer className="App">
      <WinEffectContainer>
        {winState && <WinningEffect />}
      </WinEffectContainer>
      <header className="App-header">
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={winData.winNum}
          data={data}
          backgroundColors={backgroundColors}
          textColors={textColors}
          fontSize={fontSize}
          outerBorderColor={outerBorderColor}
          outerBorderWidth={outerBorderWidth}
          innerRadius={innerRadius}
          innerBorderColor={innerBorderColor}
          innerBorderWidth={innerBorderWidth}
          radiusLineColor={radiusLineColor}
          radiusLineWidth={radiusLineWidth}
          spinDuration={spinDuration}
          // perpendicularText
          textDistance={textDistance}
          onStopSpinning={() => {
            setMustSpin(false);
            setSpin(!spin);
            const { updatedBalance, winAmount } = winData;
            if (winAmount) {
              setWinState(true);
              setUser({ ...user, balance: updatedBalance });
            } else {
              alertify.error('You did not win 👉👈 ');
              setUser({ ...user, balance: updatedBalance });
            }
            // need to clean the bets
          }}
        />
        <br />
        <SpinButton className="spin-button" onClick={handleSpinClick}>
          SPIN
        </SpinButton>
      </header>
    </RouletteWheelContainer>
  );
}

export const RouletteWheelContainer = styled.div`
  margin: 0 auto;
`;
export const SpinButton = styled.button`

&:after {
  background-color: #FDA300;
  background-image: linear-gradient(to right, #1E2F97, #4ADEDE);
}
background-color: #194569;
`;
export const WinEffectContainer = styled.div`
  z-index: 20;
`;
