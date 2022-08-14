import React from 'react';
import Chat from './chat/Chat.jsx';
import Leaderboard from "../../../dist/icons/leaderboard.png"
import Friends from "../../../dist/icons/friends.svg"
import Globe from "../../../dist/icons/globe.svg"
function Sidebar() {
  return (
    <div className="sidebar-container">
      <div className='sidebar-nav-container'>
        <img src={Globe}></img>
        <img src={Leaderboard}></img>
        <img src={Friends}></img>
      </div>
      <Chat />
    </div>
  );
}

export default Sidebar;
