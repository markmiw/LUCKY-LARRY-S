import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function FriendInput({
  closeFriendInput,
  userID,
  fetchFriends,
  showFriendAddError,
}) {
  const [username, setUsername] = useState('');

  return (
    <FriendInputContainer
      onSubmit={(e) => {
        e.preventDefault();
        if (username !== '') {
          axios({
            url: `/api/users/${userID}/friends`,
            method: 'post',
            data: {
              friendUsername: username,
            },
          })
            .then(({ data }) => {
              if (
                data === 'username not found'
                || data === 'you can\'t add yourself as a friend'
                || data === 'user is already your friend'
              ) {
                showFriendAddError(data);
              } else {
                fetchFriends();
                closeFriendInput();
              }
            })
            .catch((err) => {
              console.error('failed to add friend', err);
            });
        }
      }}
    >
      <StyledTextInput
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="global-chat-input global-chat-input-container"
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
  userID: PropTypes.number.isRequired,
  fetchFriends: PropTypes.func.isRequired,
  showFriendAddError: PropTypes.func.isRequired,
};

const FriendInputContainer = styled('form')`
  padding: 0 50px;
  display: flex;
  flex-direction: row;
  height: fit-content;
  // border-radius: 7px;
  padding-bottom: 5xpx;
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
  // flex-grow: 4;
`;

const StyledButtonInput = styled(StyledInput)`
  width: 50px;

`;

export default FriendInput;
