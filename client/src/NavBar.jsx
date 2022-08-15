import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LoginModal from './components/modal/LoginModal';
import SignUpModal from './components/modal/SignUpModal';
import BalanceModal from './components/modal/BalanceModal';

function NavBar({
  user, setUser, loggedIn, setLoggedIn,
}) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showBalanceModal, setShowBalanceModal] = useState(false);

  function openLoginModal() {
    // only have 1 modal open
    setShowSignUpModal(false);
    setShowLoginModal(true);
  }

  function openSignUpModal() {
    // only have 1 modal open
    setShowLoginModal(false);
    setShowSignUpModal(true);
  }

  function openBalanceModal() {
    setShowBalanceModal(true);
  }

  function handleLogout() {
    setLoggedIn(false);
    setUser();
    // send them back to homepage?
  }

  return (
    <>
      {showBalanceModal && (
        <BalanceModal setModal={setShowBalanceModal} />
      )}
      {showLoginModal && <LoginModal setModal={setShowLoginModal} />}
      {showSignUpModal && (
        <SignUpModal setModal={setShowSignUpModal} />
      )}
      <nav className="navbar sticky-top navbar-light bg-info mb-3">
        <Link to="/">
          <button
            type="submit"
            className="navbar-item active bg-info"
          >
            Home
          </button>
        </Link>
        <button
          type="submit"
          className="navbar-item bg-info"
          onClick={() => openBalanceModal()}
        >
          {loggedIn ? `Balance is : $${user.balance}` : null}
        </button>
        {!loggedIn ? (
          <>
            <button
              type="submit"
              className="navbar-item bg-info"
              onClick={() => openLoginModal(true)}
            >
              Login
            </button>
            <button
              type="submit"
              className="navbar-item bg-info"
              onClick={() => openSignUpModal(true)}
            >
              Sign Up
            </button>
          </>
        ) : (
          <>
            <button type="submit" className="navbar-item bg-info">
              {user.username}
            </button>
            <button
              type="submit"
              className="navbar-item bg-info"
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
