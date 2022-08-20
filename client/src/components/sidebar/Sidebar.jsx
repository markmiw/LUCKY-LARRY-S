/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Chat from './chat/Chat';
import leaderboardIcon from '../../../dist/icons/leaderboard.png';
import support from '../../../dist/icons/support.png';
import friends from '../../../dist/icons/friends.svg';
import Globe from '../../../dist/icons/globe.svg';
import Leaderboard from './leaderboard/Leaderboard';
import Friends from './friends/Friends';
import SupportAgent from './support-agent/SupportAgent';

function Sidebar({ user, loginTime }) {
  const [sidebarState, setSidebarState] = useState('global-chat');
  const [currentDmRecipient, setCurrentDmRecipient] = useState(-1);
  const [currentRecipientName, setCurrentRecipientName] = useState('');
  const renderSidebarIcons = () => {
    if (sidebarState === 'global-chat') {
      return (
        <div className="sidebar-nav-container">
          <img draggable="false" onClick={() => setSidebarState('global-chat')} id="global-chat-btn" className="sidebar-nav-btn-active" src={Globe} />
          <img draggable="false" onClick={() => setSidebarState('leaderboard')} id="leaderboard-btn" className="sidebar-nav-btn" src={leaderboardIcon} />
          <img draggable="false" onClick={() => setSidebarState('friends')} id="friends-btn" className="sidebar-nav-btn" src={friends} />
          <img draggable="false" onClick={() => setSidebarState('support')} id="global-chat-btn" className="sidebar-nav-btn" src={support} />
        </div>
      );
    }
    if (sidebarState === 'leaderboard') {
      return (
        <div className="sidebar-nav-container">
          <img draggable="false" onClick={() => setSidebarState('global-chat')} id="global-chat-btn" className="sidebar-nav-btn" src={Globe} />
          <img draggable="false" onClick={() => setSidebarState('leaderboard')} id="leaderboard-btn" className="sidebar-nav-btn-active" src={leaderboardIcon} />
          <img draggable="false" onClick={() => setSidebarState('friends')} id="friends-btn" className="sidebar-nav-btn" src={friends} />
          <img draggable="false" onClick={() => setSidebarState('support')} id="global-chat-btn" className="sidebar-nav-btn" src={support} />
        </div>
      );
    }
    if (sidebarState === 'friends') {
      return (
        <div className="sidebar-nav-container">
          <img draggable="false" onClick={() => setSidebarState('global-chat')} id="global-chat-btn" className="sidebar-nav-btn" src={Globe} />
          <img draggable="false" onClick={() => setSidebarState('leaderboard')} id="leaderboard-btn" className="sidebar-nav-btn" src={leaderboardIcon} />
          <img draggable="false" onClick={() => setSidebarState('friends')} id="friends-btn" className="sidebar-nav-btn-active" src={friends} />
          <img draggable="false" onClick={() => setSidebarState('support')} id="global-chat-btn" className="sidebar-nav-btn" src={support} />
        </div>
      );
    }
    return (
      <div className="sidebar-nav-container">
        <img draggable="false" onClick={() => setSidebarState('global-chat')} id="global-chat-btn" className="sidebar-nav-btn" src={Globe} />
        <img draggable="false" onClick={() => setSidebarState('leaderboard')} id="leaderboard-btn" className="sidebar-nav-btn" src={leaderboardIcon} />
        <img draggable="false" onClick={() => setSidebarState('friends')} id="friends-btn" className="sidebar-nav-btn" src={friends} />
        <img draggable="false" onClick={() => setSidebarState('support')} id="global-chat-btn" className="sidebar-nav-btn-active" src={support} />
      </div>
    );
  };
  const renderSidebar = () => {
    if (sidebarState === 'global-chat') {
      return <Chat user={user} loginTime={loginTime} key="global-chat" />;
    } if (sidebarState === 'leaderboard') {
      return <Leaderboard key="leaderboard" />;
    }
    if (sidebarState === 'friends') {
      return (
        <Friends
          userID={user.id}
          key="friends"
          currentDmRecipient={currentDmRecipient}
          setCurrentDmRecipient={setCurrentDmRecipient}
          currentRecipientName={currentRecipientName}
          setCurrentRecipientName={setCurrentRecipientName}
        />
      );
    }
    return <SupportAgent />;
  };

  return (
    <div className="sidebar-container">
      {renderSidebarIcons()}
      {renderSidebar()}
    </div>
  );
}

Sidebar.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  loginTime: PropTypes.instanceOf(Date).isRequired,
};

export default Sidebar;

export const SidebarContainer = styled.div`
  display: grid;
  margin: 0 auto;
  height: 90%;
`;
