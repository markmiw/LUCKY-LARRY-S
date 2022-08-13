import React from 'react';
// import styled from 'styled-components';
import PropTypes from 'prop-types';

export default function PlayInputs({ setPlays, setBetAmount }) {
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
    </div>
  );
}
