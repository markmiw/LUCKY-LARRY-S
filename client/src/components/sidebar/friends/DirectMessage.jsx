/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Picker from 'emoji-picker-react';
import flags from '../flags';
import Smileyface from '../../../../dist/icons/smile-regular.svg';
import Leftarrow from '../../../../dist/icons/left-arrow.svg';
import handleDate from '../handleDate';

// user: the one logged on
// recipient: the one user is talking to
function DirectMessage({ userID, recipientID, setCurrentDmRecipient, currentRecipientName }) {
  const [messages, setMessages] = useState([]);
  const [msgInput, setMsgInput] = useState('');
  const inputRef = useRef(null);

  const fetchMessages = () => {
    axios({
      url: `/api/userchat/${userID}/${recipientID}`,
      method: 'get',
    })
      .then(({ data }) => {
        setMessages(data);
      })
      .catch((err) => {
        console.error('failed fetching messages in direct messages', err);
      });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchMessages();
    }, 300);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const hideEmojiModal = () => {
    document.getElementsByClassName('emoji-modal')[0].classList.add('hidden');
  };

  const showEmojiModal = () => {
    document.getElementsByClassName('emoji-modal')[0].classList.remove('hidden');
  };

  const onEmojiClick = (e, emojiObject) => {
    const { selectionStart, selectionEnd } = inputRef.current;
    setMsgInput(
      msgInput.slice(0, selectionStart)
      + emojiObject.emoji
      + msgInput.slice(selectionEnd),
    );
    hideEmojiModal();
  };

  const submitMessage = (e) => {
    e.preventDefault();
    if (msgInput.length > 0) {
      axios.post('/api/userchat', { userID, recipientID, message: msgInput }).then(() => {
        setMsgInput('');
      })
        .then(() => {
          fetchMessages();
        })
        .catch((err) => console.log(err));
    }
  };
  const renderChatHistory = () => {
    if (messages.length) {
      return (
        <ul className="chat-list">
          {messages.map(({
            message, id, author, date,
          }) => (
            <li key={id} className="display-flex">
              <img className="global-chat-country" alt="country" src={flags[author.country]} />
              <div className="message-data">
                <div className="display-flex relative">
                  <span className="message-username">
                    {author.username}
                  </span>
                  <div className="message-data-time">{handleDate(new Date(date))}</div>
                </div>
                <div className="message">{message}</div>
              </div>
            </li>
          ))}
        </ul>
      );
    }
    return null;
  };
  return (
    <div className="chat">
      <div className="chat-header">
        <img
          className="back-button"
          src={Leftarrow}
          onClick={() => setCurrentDmRecipient(-1)}
          alt="back arrow"
        />
        <span
          className="chat-recipientName"
        >
          {currentRecipientName}
        </span>
      </div>
      <div className="chat-dm overflow-y">
        {renderChatHistory()}
      </div>
      <div className="global-chat-input-container">
        <form onSubmit={(e) => { submitMessage(e); }}>
          <input ref={inputRef} onChange={(e) => setMsgInput(e.target.value)} type="text" className="global-chat-input" placeholder="Aa" value={msgInput} />
        </form>
        <div className="emoji-container">
          <img onClick={(e) => showEmojiModal(e)} alt="emoji" className="emoji-button align-items-center" src={Smileyface} />
          <div className="emoji-modal hidden">
            <div className="emoji-backdrop" onClick={(e) => { hideEmojiModal(e); }} />
            <Picker
              pickerStyle={{ width: '250px', position: 'fixed', bottom: '165px' }}
              onEmojiClick={onEmojiClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

DirectMessage.propTypes = {
  userID: PropTypes.number.isRequired,
  recipientID: PropTypes.number.isRequired,
  setCurrentDmRecipient: PropTypes.func.isRequired,
  currentRecipientName: PropTypes.string.isRequired,
};

export default DirectMessage;
