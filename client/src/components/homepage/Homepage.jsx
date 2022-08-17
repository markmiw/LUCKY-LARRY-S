import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import img from '../../../../assets/test.jpg';
import rouletteLogo from '../../../dist/icons/roulette_icon.jpeg';

const games = ['Roulette', 'Scratch-Ticket', 'Slots'];
export default function Homepage({
  loggedIn,
  setShowLoginModal,
}) {
  function handleClick() {
    setShowLoginModal(true);
  }

  return (
    <Grid>
      {games.map((game) => {
        if (loggedIn) {
          return (
            <Game key={game}>
              <Link to={game}>
                <div>{game}</div>
                <img
                  src={rouletteLogo}
                  width="200"
                  height="200"
                  alt="game"
                />
              </Link>
            </Game>
          );
        }
        return (
          <Game key={game} onClick={() => handleClick()}>
            <div>{game}</div>
            <img src={rouletteLogo} width="200" height="200" alt="game" />
          </Game>
        );
      })}
    </Grid>
  );
}

Homepage.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  setShowLoginModal: PropTypes.func.isRequired,
};

const Grid = styled.div`
@media (min-width: 501px) {
  display: flex;
  justify-content: space-evenly;
}
@media (max-width: 500px) {
display: grid;
grid-template-columns: auto
margin: 0 auto;
gap: 6%;
}
`;

const Game = styled.div`
@media (min-width: 501px) {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
@media (max-width: 500px) {
  display: grid;
  margin: 0 auto;
}

  text-align: center;
  text-decoration: none;
  cursor: pointer;
`;
