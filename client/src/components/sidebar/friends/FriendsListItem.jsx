import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import flags from '../flags';

// no last online / last seen timestamp for mvp 😤

// <Timestamp>
// {/* thoughts on making this last online instead of last opened? */}
// Opened&nbsp;
// {handleDate(lastOpened)}
// </Timestamp>

function FriendsListItem({
  username,
  country,
  openChat,
}) {
  return (
    <FriendsListItemContainer>
      <Flag src={flags[country]} alt={`Flag of ${country}`} />
      <TextContainer>
        <Username>
          {username}
        </Username>
      </TextContainer>
      <ChatIconContainer>
        <ChatIcon
          className="material-symbols-outlined"
          onClick={openChat}
        >
          chat_bubble
        </ChatIcon>
      </ChatIconContainer>
    </FriendsListItemContainer>
  );
}

FriendsListItem.propTypes = {
  username: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  openChat: PropTypes.func.isRequired,
};

const FriendsListItemContainer = styled('div')`
  height: 60px;
  background-color: #303237;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Flag = styled('img')`
  height: 40px;
  width: 40px;
  margin: 0 10px;
`;

const TextContainer = styled('div')`
  vertical-align:top;
  display: inline-flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  color: white;
`;

const Username = styled('div')`
  font-size: large;
  color: white;
`;

const ChatIconContainer = styled('div')`
  margin-left: auto;
  margin-right: 10px;
`;

const ChatIcon = styled('span')`
  cursor: pointer;
  user-select: none;
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48;
  color: white;

  &:hover {
    font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48;
  }
`;

export default FriendsListItem;
