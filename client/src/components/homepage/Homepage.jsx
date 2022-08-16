import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import img from '../../../../assets/test.jpg';
import LoginModal from '../modal/LoginModal';

const games = ['Roulette', 'Scratcher', 'Slots'];
export default function Homepage({
  user, setUser, loggedIn, setLoggedIn,
}) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  function handleClick() {
    setShowLoginModal(true);
  }

  return (
    <>
      {showLoginModal && (
        <LoginModal
          setModal={setShowLoginModal}
          setUser={setUser}
          setLoggedIn={setLoggedIn}
        />
      )}
      <Grid>
        {games.map((game) => {
          if (loggedIn) {
            return (
              <Game key={game}>
                <Link to="/roulette">
                  <div>{game}</div>
                  <img
                    src={img}
                    width="200"
                    height="200"
                    alt="roulette"
                  />
                </Link>
              </Game>
            );
          }
          return (
            <Game key={game} onClick={() => handleClick()}>
              <div>{game}</div>
              <img
                src={img}
                width="200"
                height="200"
                alt="roulette"
              />
            </Game>
          );
        })}
      </Grid>
    </>
  );
}

Homepage.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    countryid: PropTypes.number.isRequired,
    balance: PropTypes.number.isRequired,
    winnings: PropTypes.number.isRequired,
  }).isRequired,
  setUser: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  setLoggedIn: PropTypes.func.isRequired,
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
