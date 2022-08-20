import React from 'react';
import PropTypes from 'prop-types';
import DirectMessage from './DirectMessage';
import FriendsList from './FriendsList';

// user: the one logged on
// recipient: the one user is talking to
function Friends({
  userID, currentDmRecipient, setCurrentDmRecipient, currentRecipientName, setCurrentRecipientName,
}) {
  if (currentDmRecipient !== -1) {
    return (
      <DirectMessage
        userID={userID}
        recipientID={currentDmRecipient}
        setCurrentDmRecipient={setCurrentDmRecipient}
        currentRecipientName={currentRecipientName}
      />
    );
  }

  return (
    <FriendsList
      userID={userID}
      setCurrentDmRecipient={setCurrentDmRecipient}
      setCurrentRecipientName={setCurrentRecipientName}
    />
  );
}

Friends.propTypes = {
  userID: PropTypes.number.isRequired,
  currentDmRecipient: PropTypes.number.isRequired,
  setCurrentDmRecipient: PropTypes.func.isRequired,
  currentRecipientName: PropTypes.string.isRequired,
  setCurrentRecipientName: PropTypes.func.isRequired,
};

export default Friends;
