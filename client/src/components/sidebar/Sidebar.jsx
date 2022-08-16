import React, { useState, useEffect } from 'react';
import Chat from './chat/Chat.jsx';
import leaderboard_icon from '../../../dist/icons/leaderboard.png';
import Friends from '../../../dist/icons/friends.svg';
import Globe from '../../../dist/icons/globe.svg';
import Leaderboard from './leaderboard/Leaderboard.jsx';
import FriendsList from './friends/FriendsList';

function Sidebar() {
  const [sidebarState, setSidebarState] = useState('global-chat');

  const renderSidebar = () => {
    if (sidebarState === 'global-chat') {
      return <Chat key="global-chat" />;
    } if (sidebarState === 'leaderboard') {
      return <Leaderboard key="leaderboard" />;
    }
    // temp userid
    return <FriendsList userID={1} key="friends" />;
  };
  return (
    <div className="sidebar-container">
      <div className="sidebar-nav-container">
        <img onClick={() => setSidebarState('global-chat')} className="sidebar-nav-btn" src={Globe} />
        <img onClick={() => setSidebarState('leaderboard')} className="sidebar-nav-btn" src={leaderboard_icon} />
        <img onClick={() => setSidebarState('friends')} className="sidebar-nav-btn" src={Friends} />
      </div>
      {renderSidebar()}
    </div>
  );
}

export default Sidebar;
