import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import axios from 'axios';
import FriendsListItem from './FriendsListItem';
import FriendInput from './FriendInput';

function FriendsList({ userID }) {
  const [showingFriendInput, setShowingFriendInput] = useState(false);

  const [friends, setFriends] = useState([]);

  const fetchFriends = () => {
    axios({
      url: `/api/users/${userID}/friends`,
      method: 'get',
    })
      .then(({ data }) => {
        const mapped = data.map((user) => ({
          flag: 'Usa',
          lastOpened: new Date().toISOString(),
          ...user,
        }));
        setFriends(mapped);
      })
      .catch((err) => {
        console.error('failed to fetch friends', err);
      });
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  return (
    <FriendsListContainer>
      <Header>
        <Title>
          Chat
        </Title>
        <OpenFriendInputIcon
          className="material-symbols-outlined"
          onClick={() => {
            setShowingFriendInput(!showingFriendInput);
          }}
        >
          {showingFriendInput ? 'close' : 'person_add'}
        </OpenFriendInputIcon>
      </Header>
      {showingFriendInput
        ? (
          <FriendInput
            closeFriendInput={() => setShowingFriendInput(false)}
            userID={userID}
            fetchFriends={fetchFriends}
          />
        )
        : <Spacer />}
      <List>
        {friends.map((friend) => (
          <FriendsListItem
            key={friend.id}
            username={friend.username}
            flag={friend.flag}
            lastOpened={friend.lastOpened}
          />
        ))}
      </List>
    </FriendsListContainer>
  );
}

FriendsList.propTypes = {
  userID: PropTypes.number.isRequired,
};

const FriendsListContainer = styled('div')`
  width: 400px;
  border: 1px solid black;
`;

const Header = styled('div')`
  width: 100%;
  display: flex;
  position: relative;
  flex-direction: row;
  height: 40px;
  align-items: center;
  justify-content: center;
`;

const Title = styled('div')`
  font-size: x-large;
`;

const Spacer = styled('div')`
  height: 40px;
`;

const List = styled('div')`
  overflow-y: scroll;
  height: 500px;
`;

const OpenFriendInputIcon = styled('span')`
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
  user-select: none;
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48;

  &:Hover {
    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48;
  }
`;

export default FriendsList;
