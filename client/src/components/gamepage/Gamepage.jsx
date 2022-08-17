/* eslint-disable react/prop-types */
/* eslint-disable react/forbid-prop-types */
import React, { } from 'react';
import Sidebar from '../sidebar/Sidebar';
import Roulette from '../roulette/Roulette';
import ScratchTicket from '../scratch-ticket/ScratchTicket';
import Slots from '../slots/Slots';

const renderGame = (game) => {
  if (game === 'roulette') {
    return <Roulette />;
  }
  if (game === 'scratch-ticket') {
    return <ScratchTicket />;
  }
  return <Slots />;
};

function Gamepage({ user, game }) {
  return (
    <div className="game-container">
      <Sidebar user={user} />
      {renderGame(game)}
    </div>
  );
}

export default Gamepage;
