import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import img from '../../../../assets/test.jpg';
import rouletteLogo from '../../../dist/icons/roulette_icon.png';
import slotsLogo from '../../../dist/icons/slots_icon.png';
import ticketLogo from '../../../dist/icons/scratch_ticket_icon.png';

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
      {loggedIn ? (
        <>
        <Game>
          <Link to='/Roulette'>
            <div>Roulette</div>
            <img
              src={rouletteLogo}
              width="200"
              height="200"
              alt="game"
            />
          </Link>
        </Game>
         <Game>
         <Link to='/Scratch-Ticket'>
           <div>Scratch Ticket</div>
           <img
             src={ticketLogo}
             width="200"
             height="200"
             alt="game"
           />
         </Link>
       </Game>
       <Game >
       <Link to='/Slots'>
         <div>Slots</div>
         <img
           src={slotsLogo}
           width="200"
           height="200"
           alt="game"
         />
       </Link>
     </Game>
     </>
     ) :
     (
      <>
        <Game onClick={() => handleClick()}>
          <div>Roulette</div>
          <img src={rouletteLogo} width="200" height="200" alt="game" />
        </Game>
        <Game onClick={() => handleClick()}>
        <div>Scratch Ticket</div>
        <img src={ticketLogo} width="200" height="200" alt="game" />
      </Game>
      <Game onClick={() => handleClick()}>
      <div>Slots</div>
      <img src={slotsLogo} width="200" height="200" alt="game" />
    </Game>
    </>
    )
  }
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
