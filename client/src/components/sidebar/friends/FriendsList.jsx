import React, { useState } from 'react';
import styled from 'styled-components';
import FriendsListItem from './FriendsListItem';
import FriendInput from './FriendInput';

function FriendsList() {
  const [showingFriendInput, setShowingFriendInput] = useState(false);

  // placeholder
  const [friends] = useState([
    {
      id: 1,
      username: 'Bruce',
      flag: 'Japan',
      lastOpened: new Date().toISOString(),
    },
    {
      id: 2,
      username: 'Mark',
      flag: 'Usa',
      lastOpened: new Date('13 august 2022').toISOString(),
    },
    {
      id: 3,
      username: 'Andy',
      flag: 'Usa',
      lastOpened: new Date().toISOString(),
    },
    {
      id: 4,
      username: 'Gary',
      flag: 'Usa',
      lastOpened: new Date('13 august 2022').toISOString(),
    },
    {
      id: 5,
      username: 'River',
      flag: 'Usa',
      lastOpened: new Date().toISOString(),
    },
    {
      id: 6,
      username: 'Jesse',
      flag: 'Canada',
      lastOpened: new Date('13 august 2022').toISOString(),
    },
    {
      id: 7,
      username: 'Matthew',
      flag: 'Usa',
      lastOpened: new Date('13 august 2022').toISOString(),
    },
    {
      id: 8,
      username: 'Cornelius',
      flag: 'Germany',
      lastOpened: new Date('12 august 2022').toISOString(),
    },
    {
      id: 9,
      username: 'Cornelius',
      flag: 'Germany',
      lastOpened: new Date('12 august 2022').toISOString(),
    },
  ]);

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
