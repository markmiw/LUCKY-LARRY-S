import React, { useState, useEffect } from 'react';
import Chat from './chat/Chat.jsx';
import leaderboard_icon from '../../../dist/icons/leaderboard.png';
import Friends from '../../../dist/icons/friends.svg';
import Globe from '../../../dist/icons/globe.svg';
import Leaderboard from './leaderboard/Leaderboard.jsx';
import FriendsList from './friends/FriendsList';

function Sidebar({ user, loginTime }) {
  const [sidebarState, setSidebarState] = useState('global-chat');

  const renderSidebarIcons = () => {
    if (sidebarState === 'global-chat') {
      return (
        <div className="sidebar-nav-container">
          <img onClick={() => setSidebarState('global-chat')} id="global-chat-btn" className="sidebar-nav-btn-active" src={Globe} />
          <img onClick={() => setSidebarState('leaderboard')} id="leaderboard-btn" className="sidebar-nav-btn" src={leaderboard_icon} />
          <img onClick={() => setSidebarState('friends')} id="friends-btn" className="sidebar-nav-btn" src={Friends} />
        </div>
      );
    }
    if (sidebarState === 'leaderboard') {
      return (
        <div className="sidebar-nav-container">
          <img onClick={() => setSidebarState('global-chat')} id="global-chat-btn" className="sidebar-nav-btn" src={Globe} />
          <img onClick={() => setSidebarState('leaderboard')} id="leaderboard-btn" className="sidebar-nav-btn-active" src={leaderboard_icon} />
          <img onClick={() => setSidebarState('friends')} id="friends-btn" className="sidebar-nav-btn" src={Friends} />
        </div>
      );
    }
    return (
      <div className="sidebar-nav-container">
        <img onClick={() => setSidebarState('global-chat')} id="global-chat-btn" className="sidebar-nav-btn" src={Globe} />
        <img onClick={() => setSidebarState('leaderboard')} id="leaderboard-btn" className="sidebar-nav-btn" src={leaderboard_icon} />
        <img onClick={() => setSidebarState('friends')} id="friends-btn" className="sidebar-nav-btn-active" src={Friends} />
      </div>
    );
  };
  const renderSidebar = () => {
    if (sidebarState === 'global-chat') {
      return <Chat user={user} loginTime={loginTime} key="global-chat" />;
    } if (sidebarState === 'leaderboard') {
      return <Leaderboard key="leaderboard" />;
    }
    // temp userid
    return <FriendsList userID={1} key="friends" />;
  };

  return (
    <div className="sidebar-container">
      {renderSidebarIcons()}
      {renderSidebar()}
    </div>
  );
}

export default Sidebar;
