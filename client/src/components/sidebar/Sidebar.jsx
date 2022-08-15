import React, {useState} from 'react';
import Chat from './chat/Chat.jsx';
import Leaderboard from "../../../dist/icons/leaderboard.png"
import Friends from "../../../dist/icons/friends.svg"
import Globe from "../../../dist/icons/globe.svg"
function Sidebar() {
  return (
    <div className="sidebar-container">
      <div className='sidebar-nav-container'>
        <img className='sidebar-nav-btn' src={Globe}></img>
        <img className='sidebar-nav-btn' src={Leaderboard}></img>
        <img className='sidebar-nav-btn' src={Friends}></img>
      </div>
      <Chat/>
    </div>
  );
}

export default Sidebar;
