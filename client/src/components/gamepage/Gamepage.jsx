import React, { } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
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

function Gamepage({ game, user }) {
  return (
    <GamePageGrid className="game-container">
      <GameContainer>
      {renderGame(game)}
      </GameContainer>
    <SidebarContainer>
      <Sidebar user={user} />
    </SidebarContainer>
    </GamePageGrid>
  );
}

Gamepage.propTypes = {
  user: PropTypes.object.isRequired,
  game: PropTypes.string.isRequired,
};

export default Gamepage;

export const GamePageGrid = styled.div`
  display: grid;
  max-width: 95vw;
  margin: 0 auto;
  gap: 5%;
  @media (min-width: 501px) {
    grid-template-columns: auto auto;
    gap: 5%;
  }
  @media (max-width: 500px) {
    grid-template-rows: auto auto;
    gap: 5%;
  }
`
export const GameContainer = styled.div`
  max-width: 100%;
`
export const SidebarContainer = styled.div`
  max-width: 100%;
`