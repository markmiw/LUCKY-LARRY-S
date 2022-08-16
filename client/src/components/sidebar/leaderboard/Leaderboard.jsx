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
    <div className="leaderboard-container" align="center">
      <div
        style={{
          display: 'grid',
          gridAutoFlow: 'column',
        }}
        className="headers"
      >
        <p>
          Rank
        </p>
        <p>
          Player
        </p>
        <p>
          Winnings
        </p>
      </div>
      <ol>
        {topUsers.map((user, index) => (
          <Item key={user.username} user={user} index={index} />
        ))}
      </ol>
    </div>
  );
}

export default Leaderboard;
