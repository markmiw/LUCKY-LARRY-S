import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import flags from '../flags';

export default function Item({ user, index }) {
  const [country, setCountry] = useState('');
  const winnings = Intl.NumberFormat('en-US', { maximumFractionDigits: 1, notation: 'compact', compactDisplay: 'short' }).format(user.winnings);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/country/${user.countryid}`)
      .then((results) => { setCountry(results.data[0].country); })
      .catch((err) => console.log(err));
  }, []);

  return (
    <tr>
      <td className="rank">
        <span>{index + 1}</span>
      </td>
      <td>
        <img
          src={flags[country]}
          className="flag"
          alt={country}
        />
      </td>

      <td className="leaderboard-username"><span>{user.username}</span></td>
      <td className="leaderboard-winnings"><span>{winnings}</span></td>
    </tr>
  );
}

Item.propTypes = {
  user: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};
