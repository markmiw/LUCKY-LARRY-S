import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled, { css, keyframes } from 'styled-components';
import img from '../../../../assets/test.jpg';
import rouletteLogo from '../../../dist/icons/roulette_icon.png';
import slotsLogo from '../../../dist/icons/slots_icon.png';
import ticketLogo from '../../../dist/icons/scratch_ticket_icon.png';
import LarryLogoPic from '../../../dist/icons/LarryLogo.jpeg';

const games = ['Roulette', 'Scratch-Ticket', 'Slots'];
export default function Homepage({
  loggedIn,
  setShowLoginModal,
}) {
  function handleClick() {
    setShowLoginModal(true);
  }

  return (
    <HomeGrid>
      <Grid>
        {loggedIn ? (
          <>
            <Game>
              <Link to="/Roulette">
                {/* <div>Roulette</div> */}
                <GameImage
                  src={rouletteLogo}
                  width="200"
                  height="200"
                  alt="game"
                />
              </Link>
            </Game>
            <Game>
              <Link to="/Scratch-Ticket">
                {/* <div>Scratch Ticket</div> */}
                <GameImage
                  src={ticketLogo}
                  width="200"
                  height="200"
                  alt="game"
                />
              </Link>
            </Game>
            <Game>
              <Link to="/Slots">
                {/* <div>Slots</div> */}
                <GameImage
                  src={slotsLogo}
                  width="200"
                  height="200"
                  alt="game"
                />
              </Link>
            </Game>
          </>
        )
          : (
            <>
              <Game onClick={() => handleClick()}>
                {/* <div>Roulette</div> */}
                <GameImage src={rouletteLogo} width="200" height="200" alt="game" />
              </Game>
              <Game onClick={() => handleClick()}>
                {/* <div>Scratch Ticket</div> */}
                <GameImage src={ticketLogo} width="200" height="200" alt="game" />
              </Game>
              <Game onClick={() => handleClick()}>
                {/* <div>Slots</div> */}
                <GameImage src={slotsLogo} width="200" height="200" alt="game" />
              </Game>

            </>
          )}
      </Grid>
      <LarryLogo />
    </HomeGrid>
  );
}

Homepage.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  setShowLoginModal: PropTypes.func.isRequired,
};

const HomeGrid = styled.div`
  display: grid;
  margin: 0 auto;
  grid-template-rows: auto auto;
  gap: 6%;
`;

const colorRotate = keyframes`
  0% {
    filter: hue-rotate(1deg);
  }

  50% {
    filter: hue-rotate(180deg);
  }

  100% {
    filter: hue-rotate(1deg);
  }
`;

const LarryLogo = styled.div`
  display: grid;
  margin: 0 auto;
  height: 400px;
  width: 400px;
  background-image: url(${LarryLogoPic});
  background-size: contain;
  animation: ${css`${colorRotate}`} 4s ease-in infinite;
`;

const Grid = styled.div`
@media (min-width: 601px) {
  display: flex;
  justify-content: space-evenly;
}
@media (max-width: 600px) {
  display: grid;
  grid-template-rows: auto
  margin: 0 auto;
  gap: 6%;
}
`;

const GameImage = styled.img`
  border-radius: 16px;
  margin-top: 16px;
`;

const Game = styled.div`
animation: ${css`${colorRotate}`} 1s ease-in infinite;
@media (min-width: 601px) {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
@media (max-width: 600px) {
  display: grid;
  margin: 0 auto;
}

  text-align: center;
  text-decoration: none;
  cursor: pointer;
`;
