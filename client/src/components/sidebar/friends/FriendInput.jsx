import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function FriendInput({ closeFriendInput }) {
  const [username, setUsername] = useState('');

  return (
    <FriendInputContainer
      onSubmit={(e) => {
        e.preventDefault();
        // only submit if username is non-empty
        if (username !== '') {
          console.log(`submitting ${username}`);
          closeFriendInput();
        }
      }}
    >
      <StyledTextInput
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <StyledButtonInput
        type="submit"
        value="Add"
      />
    </FriendInputContainer>
  );
}

FriendInput.propTypes = {
  closeFriendInput: PropTypes.func.isRequired,
};

const FriendInputContainer = styled('form')`
  padding: 0 50px;
  display: flex;
  flex-direction: row;
`;

const StyledInput = styled('input')`
  height: 30px;
  margin: 5px 0 5px 5px;
  padding: 0 5px;
  border: 1px solid black;

  &:last-child {
    margin-right: 5px;
  }
`;

const StyledTextInput = styled(StyledInput)`
  flex-grow: 4;
`;

const StyledButtonInput = styled(StyledInput)`
  width: 50px
`;

export default FriendInput;
