import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import PropTypes from 'prop-types';
import Column from './Column';
import PlayInputs from './PlayInputs';

export default function Slots({ user, setUser }) {
  const [column1Values, setColumn1Values] = useState([1, 2, 3]);
  const [column2Values, setColumn2Values] = useState([4, 5, 1]);
  const [column3Values, setColumn3Values] = useState([2, 3, 4]);
  const [plays, setPlays] = useState(1);
  const [betAmount, setBetAmount] = useState('1');
  // Will replace below with actual balance from db
  const [balance, setBalance] = useState(user.balance);
  const [adjustment, setAdjustment] = useState(0);
  function getSlotArray(start, result) {
    const filler = [...new Array(75)].map(() => Math.floor(Math.random() * 5));
    return start.concat(filler, result);
  }

  function play() {
    if (column3Values.length !== 3) {
      return;
    }
    let newBalance = balance - betAmount * plays;
    setUser({ ...user, balance: newBalance });
    axios.put('/api/slots', { data: { userid: user.id, bet: betAmount, rows: plays } })
      .then((result) => {
        const { rows, winningsData } = result.data;
        const col1 = [rows[0], rows[3], rows[6]];
        const col2 = [rows[1], rows[4], rows[7]];
        const col3 = [rows[2], rows[5], rows[8]];
        setBalance(balance - betAmount * plays);
        setAdjustment(winningsData.winnings);
        setColumn1Values(getSlotArray(column1Values, col1));
        setColumn2Values(getSlotArray(column2Values, col2));
        setColumn3Values(getSlotArray(column3Values, col3));
        newBalance += winningsData.winnings;
        setUser({ ...user, balance: newBalance });
      })
      .catch((err) => {
        console.log('Error in Slots play:', err);
      });
  }

  return (
    <SlotsContainer>
      <ColumnsContainer>
        <Column
          scrollTime={4}
          values={column1Values}
          setValues={setColumn1Values}
          balance={balance}
          setBalance={setBalance}
          adjustment={adjustment}
          column={1}
          iconSize={100}
        />
        <Column
          scrollTime={5.5}
          values={column2Values}
          setValues={setColumn2Values}
          balance={balance}
          setBalance={setBalance}
          adjustment={adjustment}
          column={2}
          iconSize={100}
        />
        <Column
          scrollTime={7}
          values={column3Values}
          setValues={setColumn3Values}
          balance={balance}
          setBalance={setBalance}
          adjustment={adjustment}
          column={3}
          iconSize={100}
        />
      </ColumnsContainer>
      {/* <div>
        Balance: $
        {balance}
      </div> */}
      <PlayInputs
        setPlays={setPlays}
        betAmount={betAmount}
        setBetAmount={setBetAmount}
        play={() => { play(); }}
      />
    </SlotsContainer>
  );
}

Slots.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    countryid: PropTypes.number.isRequired,
    balance: PropTypes.number.isRequired,
    winnings: PropTypes.number.isRequired,
  }).isRequired,
  setUser: PropTypes.func.isRequired,
};

const SlotsContainer = styled.div`
  width: 50vw;
`;

const ColumnsContainer = styled.div`
  min-width: 300px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;
