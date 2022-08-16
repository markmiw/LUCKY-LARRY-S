import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import img from '../../../../assets/test.jpg';

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
                  src={img}
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
            <img src={img} width="200" height="200" alt="game" />
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
  display: flex;
  justify-content: space-evenly;
`;

const Game = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
`;
