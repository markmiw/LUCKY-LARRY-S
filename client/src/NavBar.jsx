import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LoginModal from './components/modal/LoginModal';
import SignUpModal from './components/modal/SignUpModal';
import BalanceModal from './components/modal/BalanceModal';

function NavBar({ user, setUser, loggedIn, setLoggedIn }) {
  const [showLoginModal, setShowLoginModal] = useState(false);
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
    <>
      {showBalanceModal && (<BalanceModal setModal={setShowBalanceModal} />)}
      {showLoginModal && <LoginModal setModal={setShowLoginModal} />}
      {showSignUpModal && (<SignUpModal setModal={setShowSignUpModal} />)}
      <nav className="navbar navbar-expand-lg sticky-top navbar-light bg-success mb-3">
        <Link to="/">
          <button type="submit" className="navbar-item btn">
            Home
          </button>
        </Link>
        {loggedIn ? (
          <button
            type="submit"
            className="navbar-item btn"
            onClick={() => openBalanceModal()}
          >
            Balance is $
            {user.balance}
          </button>
        ) : null}
        {!loggedIn ? (
          <>
            <button
              type="submit"
              className="navbar-item btn me-auto"
              onClick={() => openLoginModal(true)}
            >
              Login
            </button>
            <button
              type="submit"
              className="navbar-item btn"
              onClick={() => openSignUpModal(true)}
            >
              Sign Up
            </button>
          </>
        ) : (
          <>
            <button type="submit" className="navbar-item btn">
              {user.username}
            </button>
            <button
              type="submit"
              className="navbar-item btn"
              onClick={() => handleLogout()}
            >
              Log Out
            </button>
          </>
        )}
      </nav>
    </>
  );
}

NavBar.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    balance: PropTypes.number.isRequired,
  }).isRequired,
  setUser: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  setLoggedIn: PropTypes.func.isRequired,
};

export default NavBar;
