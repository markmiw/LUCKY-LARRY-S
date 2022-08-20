import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function Modal({ children }) {
  return (
    <Background id="modal-background">
      <Container>{children}</Container>
    </Background>
  );
}

Modal.propTypes = {
  children: PropTypes.node,
};

Modal.defaultProps = {
  children: null,
};

const Background = styled.div`
  display: grid;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  place-items: center;
  z-index: 10;
  background-color: rgb(30 41 59 / 0.75);
`;

const Container = styled.div`
  display: grid;
  place-items: center;
`;

export default Modal;
