import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import PropTypes from 'prop-types';
import Column from './Column';
import PlayInputs from './PlayInputs';
import WinningEffect from '../shared/WinningEffect';
import slotsScores from '../../../dist/SlotsScores.png';

export default function Slots({ user, setUser }) {
  const [column1Values, setColumn1Values] = useState([1, 2, 3]);
  const [column2Values, setColumn2Values] = useState([4, 5, 1]);
  const [column3Values, setColumn3Values] = useState([2, 3, 4]);
  const [plays, setPlays] = useState(1);
  const [betAmount, setBetAmount] = useState('1');
  const [adjustment, setAdjustment] = useState(0);
  const [winState, setWinState] = useState(false);
  const [winningRows, setWinningRows] = useState([]);
  const [gameInProgress, setGameInProgress] = useState(false);
  function getSlotArray(start, result) {
    const filler = [...new Array(75)].map(() => Math.floor(Math.random() * 5) + 1);
    return start.concat(filler, result);
  }

  function play() {
    if (column3Values.length !== 3) {
      return;
    }
    const newBalance = user.balance - Number(betAmount) * plays;
    // can't bet more than you have, or negative bets
    if (newBalance < 0 || Number(betAmount) < 0 || betAmount === '') {
      return;
    }
    setGameInProgress(true);
    setUser({ ...user, balance: newBalance });
    axios.put('/api/slots', { data: { userid: user.id, bet: betAmount, rows: plays } })
      .then((result) => {
        if (result.data === 'insufficient funds') {
          return;
        }
        const { rows, winningsData } = result.data;
        const col1 = [rows[0], rows[3], rows[6]];
        const col2 = [rows[1], rows[4], rows[7]];
        const col3 = [rows[2], rows[5], rows[8]];
        setColumn1Values(getSlotArray(column1Values, col1));
        setColumn2Values(getSlotArray(column2Values, col2));
        setColumn3Values(getSlotArray(column3Values, col3));
        setAdjustment(winningsData.winnings);
        setWinningRows(winningsData.winningRows);
      })
      .catch((err) => {
        console.log('Error in Slots play:', err);
      });
  }

  const winningEffect = () => {
    setTimeout(() => {
      setTimeout(() => {
        setWinState(false);
      }, 7000);
    });
  };

  useEffect(winningEffect, [winState]);

  return (
    <SlotsContainer>
      <EffectContainer>
        {winState && <WinningEffect />}
      </EffectContainer>
      <ColumnsContainer>
        <Column
          scrollTime={4}
          values={column1Values}
          setValues={setColumn1Values}
          iconSize={100}
          column={1}
          adjustment={adjustment}
          user={user}
          setUser={setUser}
          winState={winState}
          setWinState={setWinState}
          winningRows={winningRows}
          gameInProgress={gameInProgress}
          setGameInProgress={setGameInProgress}
          plays={plays}
        />
        <Column
          scrollTime={5.5}
          values={column2Values}
          setValues={setColumn2Values}
          iconSize={100}
          column={2}
          adjustment={adjustment}
          user={user}
          setUser={setUser}
          winState={winState}
          setWinState={setWinState}
          winningRows={winningRows}
          gameInProgress={gameInProgress}
          setGameInProgress={setGameInProgress}
          plays={plays}
        />
        <Column
          scrollTime={7}
          values={column3Values}
          setValues={setColumn3Values}
          iconSize={100}
          column={3}
          adjustment={adjustment}
          user={user}
          setUser={setUser}
          winState={winState}
          setWinState={setWinState}
          winningRows={winningRows}
          gameInProgress={gameInProgress}
          setGameInProgress={setGameInProgress}
          plays={plays}
        />
      </ColumnsContainer>
      <PlayInputs
        setPlays={setPlays}
        betAmount={betAmount}
        setBetAmount={setBetAmount}
        play={() => { play(); }}
        plays={plays}
      />
      <ScoreContainer>
        <img style={{ width: '200px', borderRadius: '16px' }} src={slotsScores} alt="slots scorecard" />
      </ScoreContainer>
    </SlotsContainer>
  );
}

Slots.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    balance: PropTypes.number.isRequired,
  }).isRequired,
  setUser: PropTypes.func.isRequired,
};

const ScoreContainer = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const SlotsContainer = styled.div`
  width: 100%;
`;

const EffectContainer = styled.div`
  z-index: 5;
`;

const ColumnsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;
