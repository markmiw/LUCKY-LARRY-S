import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Moment from 'react-moment';
import flags from '../Flag';

function FriendsListItem({ username, country, lastOpened }) {
  return (
    <FriendsListItemContainer>
      <Flag src={flags[country]} alt={`Flag of ${country}`} />
      <TextContainer>
        <Username>
          {username}
        </Username>
        <Timestamp>
          {/* thoughts on making this last online instead of last opened? */}
          Opened&nbsp;
          <StyledMoment fromNow>{lastOpened}</StyledMoment>
        </Timestamp>
      </TextContainer>
      <ChatIconContainer>
        <ChatIcon className="material-symbols-outlined">
          chat_bubble
        </ChatIcon>
      </ChatIconContainer>
    </FriendsListItemContainer>
  );
}

FriendsListItem.propTypes = {
  username: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  lastOpened: PropTypes.string.isRequired,
};

const FriendsListItemContainer = styled('div')`
  height: 60px;
  background-color: white;
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
`;

const Username = styled('div')`
  font-size: large;
  color: black;
`;

const Timestamp = styled('div')`
  font-size: small;
  color: black;
`;

const StyledMoment = styled(Moment)`
  color: black;
`;

const ChatIconContainer = styled('div')`
  margin-left: auto;
  margin-right: 10px;
`;

const ChatIcon = styled('span')`
  cursor: pointer;
  user-select: none;
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48;

  &:hover {
    font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48;
  }
`;

export default FriendsListItem;
