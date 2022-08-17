/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Chat from './chat/Chat.jsx';
import leaderboard_icon from '../../../dist/icons/leaderboard.png';
import friends from '../../../dist/icons/friends.svg';
import Globe from '../../../dist/icons/globe.svg';
import Leaderboard from './leaderboard/Leaderboard.jsx';
import Friends from './friends/Friends';

function Sidebar({ user }) {
  const [sidebarState, setSidebarState] = useState('global-chat');
  const [currentDmRecipient, setCurrentDmRecipient] = useState(null);
  console.log('recipient:', currentDmRecipient);

  const renderSidebar = () => {
    if (sidebarState === 'global-chat') {
      return <Chat key="global-chat" />;
    } if (sidebarState === 'leaderboard') {
      return <Leaderboard key="leaderboard" />;
    }
    // temp userid
    return (
      <Friends
        userID={user.id}
        key="friends"
        currentDmRecipient={currentDmRecipient}
        setCurrentDmRecipient={setCurrentDmRecipient}
      />
    );
  };
  return (
    <SidebarContainer className="sidebar-container">
      <div className="sidebar-nav-container">
        <img
          onClick={() => setSidebarState('global-chat')}
          className="sidebar-nav-btn"
          src={Globe}
        />
        <img
          onClick={() => setSidebarState('leaderboard')}
          className="sidebar-nav-btn"
          src={leaderboard_icon}
        />
        <img
          onClick={() => {
            setCurrentDmRecipient(null);
            setSidebarState('friends');
          }}
          className="sidebar-nav-btn"
          src={friends}
        />
      </div>
      {renderSidebar()}
    </SidebarContainer>
  );
}

Sidebar.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default Sidebar;

export const SidebarContainer = styled.div`
  display: grid;
  margin: 0 auto;
  height: 90%;
`;
