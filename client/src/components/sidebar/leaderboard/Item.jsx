import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import flags from '../Flag';

export default function Item({ user, index }) {
  const [country, setCountry] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:3000/api/country/${user.countryid}`)
      .then((results) => { setCountry(results.data[0].country); })
      .catch((err) => console.log(err));
  }, []);

  return (
    <li
      className="item"
      style={{
        display: 'grid',
        justifyItems: 'center',
        gridAutoFlow: 'column',
      }}
    >
      <span className="rank">{index + 1}</span>
      <img
        src={flags[country]}
        className="flag"
        alt={country}
      />
      <span className="username">{user.username}</span>
      <span className="winnings">${user.winnings}</span>
    </li>
  );
}

Item.propTypes = {
  user: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};
