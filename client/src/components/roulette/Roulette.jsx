import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import RouletteWheel from './RouletteWheel';
import BetTable from './BetTable';

export default function Roulette({ user, setUser }) {
  const [betInfo, setBetInfo] = useState('');
  const [spin, setSpin] = useState(false);

  return (
    <RouletteGameGrid>
      <RouletteWheel
        betInfo={betInfo}
        user={user}
        setUser={setUser}
        spin={spin}
        setSpin={setSpin}
      />
      <BetTable setBetInfo={setBetInfo} spin={spin} />
    </RouletteGameGrid>
  );
}

Roulette.propTypes = {
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

export const RouletteGameGrid = styled.div`
  display: grid;
  max-width: 100%;
  margin: 0 auto;
  height: 100%;
  grid-template-rows: auto auto;
  color: white;
  @media (min-width: 501px) {
    gap: 8%;
  }
  @media (max-width: 500px) {
    gap: 2%;
  }
`;
