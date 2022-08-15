import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function NavBar({ user, loggedIn }) {
  function loginModal(e) {
    // will open a login modal
  }

  return (
    <Nav>
      <Link to="/">
        <NavItem>Home</NavItem>
      </Link>
      <NavItem>
        {!loggedIn ? null : `Balance : $${user.balance}`}
      </NavItem>
      <NavItem>{!loggedIn ? null : 'Update Balance'}</NavItem>
      {!loggedIn ? (
        <NavItem onClick={(e) => loginModal(e)}>Login</NavItem>
      ) : (
        <NavItem>{user.username}</NavItem>
      )}
    </Nav>
  );
}

NavBar.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    balance: PropTypes.number.isRequired,
  }).isRequired,
  loggedIn: PropTypes.bool.isRequired,
};

const Nav = styled.header`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  background-color: grey;
  margin-bottom: 1%;
`;

const NavItem = styled.div`
  display: flex;
  justify-content: center;
  color: green;
  border: 1px solid black;
`;

export default NavBar;
