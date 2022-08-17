import React from 'react';
import PropTypes from 'prop-types';
import DirectMessage from './DirectMessage';
import FriendsList from './FriendsList';

// user: the one logged on
// recipient: the one user is talking to
function Friends({ userID, currentDmRecipient, setCurrentDmRecipient }) {
  if (currentDmRecipient !== null) {
    return (
      <DirectMessage
        userID={userID}
        recipientID={currentDmRecipient}
      />
    );
  }

  return (
    <FriendsList
      userID={userID}
      setCurrentDmRecipient={setCurrentDmRecipient}
    />
  );
}

Friends.propTypes = {
  userID: PropTypes.number.isRequired,
  currentDmRecipient: PropTypes.number.isRequired,
  setCurrentDmRecipient: PropTypes.func.isRequired,
};

export default Friends;
