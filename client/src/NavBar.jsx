import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import SignUpModal from './components/modal/SignUpModal';
import BalanceModal from './components/modal/BalanceModal';
import { GreenWhiteButton, YellowOrangeButton, PinkRedButton, BlueBlackButton, GreenBlackButton, BlueAquaButton, BlueLightBlueButton, LightPurplePulpleButton, PurplePinkButton } from './components/shared/button.styled.js';

function NavBar({
  user, setUser, loggedIn, setLoggedIn, setShowLoginModal,
}) {
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showBalanceModal, setShowBalanceModal] = useState(false);

  function openLoginModal() {
    // only have 1 modal open
    setShowBalanceModal(false);
    setShowSignUpModal(false);

    setShowLoginModal(true);
  }

  function openSignUpModal() {
    // only have 1 modal open
    setShowBalanceModal(false);
    setShowLoginModal(false);

    setShowSignUpModal(true);
  }

  function openBalanceModal() {
    setShowLoginModal(false);
    setShowSignUpModal(false);

    setShowBalanceModal(true);
  }

  function handleLogout() {
    setLoggedIn(false);
    setUser();
    // send them back to homepage?
  }

  return (
    <NavBarGrid>
      {showBalanceModal && (
        <BalanceModal user={user} setUser={setUser} setModal={setShowBalanceModal} />
      )}
      {showSignUpModal && (
        <SignUpModal setModal={setShowSignUpModal} />
      )}
      <nav className="navbar navbar-expand-lg mb-3">
        <Link to="/">
          <PinkRedButton type="submit" className="navbar-item">
            Home
          </PinkRedButton>
        </Link>
        {loggedIn ? (
          <BlueLightBlueButton
            type="submit"
            className="navbar-item"
            onClick={() => openBalanceModal()}
          >
            Balance is $
            {user.balance}
          </BlueLightBlueButton>
        ) : null}
        {!loggedIn ? (
          <>
            <PurplePinkButton
              type="submit"
              className="navbar-item"
              onClick={() => openLoginModal(true)}
            >
              Login
            </PurplePinkButton>
            <LightPurplePulpleButton
              type="submit"
              className="navbar-item"
              onClick={() => openSignUpModal(true)}
            >
              Sign Up
            </LightPurplePulpleButton>
          </>
        ) : (
          <>
            <BlueLightBlueButton type="submit" className="navbar-item">
              {user.username}
            </BlueLightBlueButton>
            <BlueLightBlueButton
              type="submit"
              className="navbar-item"
              onClick={() => handleLogout()}
            >
              Log Out
            </BlueLightBlueButton>
          </>
        )}
      </nav>
    </NavBarGrid>
  );
}

NavBar.propTypes = {
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
  setShowLoginModal: PropTypes.func.isRequired,
};

export default NavBar;

export const NavBarGrid = styled.div`
// display: grid;
// max-width: 100%;
// margin: 0 auto;
// height: 100%;
// color: white;
// @media (min-width: 501px) {
//   grid-template-column: auto auto auto auto;
// }
// @media (max-width: 500px) {
//   grid-template-column: auto auto;
// }
`
