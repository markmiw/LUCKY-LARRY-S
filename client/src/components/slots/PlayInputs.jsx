import React from 'react';
import PropTypes from 'prop-types';

export default function PlayInputs({ setPlays, betAmount, setBetAmount }) {
  return (
    <div>
      <button type="button" onClick={() => setPlays(1)}>
        1 Line
      </button>
      <button type="button" onClick={() => setPlays(2)}>
        2 Lines
      </button>
      <button type="button" onClick={() => setPlays(3)}>
        3 Lines
      </button>
      <div>
        $
        <input type="number" value={betAmount} placeholder="1" onChange={(event) => setBetAmount(event.target.value)} />
      </div>
    </div>
  );
}

PlayInputs.propTypes = {
  setPlays: PropTypes.func.isRequired,
  betAmount: PropTypes.string.isRequired,
  setBetAmount: PropTypes.func.isRequired,
};
