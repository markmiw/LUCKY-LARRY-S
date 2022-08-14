import React from 'react';
import PropTypes from 'prop-types';
import Chat from './chat/Chat.jsx';
import FriendsList from './friends/FriendsList';

function Sidebar({ user }) {
  // for now, if no user is selected display nothing
  // wont need this later as sidebar will only be displayed when logged in
  if (!user) {
    return <div />;
  }
  return (
    <div className="sidebar-container">
      <FriendsList
        userID={user.id}
      />
    </div>
  );
}

Sidebar.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    balance: PropTypes.number.isRequired,
  }),
};

Sidebar.defaultProps = {
  user: undefined,
};

export default Sidebar;
