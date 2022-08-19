import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Item from './Item';

function Leaderboard() {
  const [topUsers, setTopUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/leaderboard')
      .then((results) => setTopUsers(results.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="leaderboard-container">
      <table className="leaderboard-results center-vert-horz">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Country</th>
            <th>Player</th>
            <th>Winnings</th>
          </tr>
        </thead>
        <tbody>
          {topUsers.map((user, index) => (
            <Item key={user.username} user={user} index={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
