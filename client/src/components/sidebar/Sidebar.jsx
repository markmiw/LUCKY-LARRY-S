import React from 'react';
import Chat from './chat/Chat.jsx';
import FriendsList from './friends/FriendsList';

function Sidebar() {
  return (
    <div className="sidebar-container">
      <FriendsList />
    </div>
  );
}

export default Sidebar;
