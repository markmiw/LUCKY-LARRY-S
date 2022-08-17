import React, { } from 'react';
import PropTypes from 'prop-types';
import Sidebar from '../sidebar/Sidebar';
import Roulette from '../roulette/Roulette';
import ScratchTicket from '../scratch-ticket/ScratchTicket';
import Slots from '../slots/Slots';

const renderGame = () => {
  if (game === 'roulette') {
    return <Roulette />;
  }
  if (game === 'scratch-ticket') {
    return <ScratchTicket />;
  }
  return <Slots />;
};

function Gamepage({ game }) {
  return (
    <div className="game-container">
      <Sidebar user={user} />
      {renderGame()}
    </div>
  );
}

Gamepage.propTypes = {
  user: PropTypes.object.isRequired,
  game: PropTypes.string.isRequired,
};

export default Gamepage;
