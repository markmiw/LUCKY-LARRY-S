/* eslint-disable react/prop-types */
/* eslint-disable react/forbid-prop-types */
import React, { } from 'react';
import Sidebar from '../sidebar/Sidebar';
import Roulette from '../roulette/Roulette';
import ScratchTicket from '../scratch-ticket/ScratchTicket';
import Slots from '../slots/Slots';

const renderGame = (game, user, setUser) => {
  if (game === 'roulette') {
    return <Roulette user={user} />;
  }
  if (game === 'scratch-ticket') {
    return <ScratchTicket />;
  }
  return <Slots user={user} setUser={setUser} />;
};

function Gamepage({ game, user, setUser }) {
  return (
    <div className="game-container">
      <Sidebar user={user} />
      {renderGame(game, user, setUser)}
    </div>
  );
}

export default Gamepage;
