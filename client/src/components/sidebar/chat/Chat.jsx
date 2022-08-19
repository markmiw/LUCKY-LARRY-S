import React, { useState, useEffect, useRef } from 'react';
import Picker from 'emoji-picker-react';
import axios from 'axios';
import flags from '../flags';
import Smileyface from '../../../../dist/icons/smile-regular.svg';
import handleDate from '../handleDate';

function Chat({ user, loginTime }) {
  let username = '';
  let country = '';
  if (user) {
    username = user.username;
    country = user.country;
  }
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const inputRef = useRef(null);
  const onEmojiClick = (e, emojiObject) => {
    const { selectionStart, selectionEnd } = inputRef.current;
    const newVal = message.slice(0, selectionStart) + emojiObject.emoji + message.slice(selectionEnd);
    setMessage(newVal);
    hideEmojiModal();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      axios.get('/api/globalchat', { params: { loginTime: loginTime } }).then(({ data }) => {
        setMessages(data);
      }).catch((err) => {
        console.log(err);
      });
    }, 300);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const hideEmojiModal = (e) => {
    document.getElementsByClassName('emoji-modal')[0].classList.add('hidden');
  };

  const showEmojiModal = (e) => {
    document.getElementsByClassName('emoji-modal')[0].classList.remove('hidden');
  };

  const submitMessage = (e) => {
    e.preventDefault();
    if (message.length > 0) {
      axios.post('/api/globalchat', { username, country, message }).then((data) => {
        setMessage('');
      }).catch((err) => console.log(err));
    }
  };
  const renderChatHistory = () => {
    if (messages.length) {
      return (
        <ul className="chat-list">
          {messages.map((message, i) => (
            <li key={i} className="display-flex">
              <img className="global-chat-country" alt="country" src={flags[message.country]} />
              <div className="message-data message-bubble">
                <div className="display-flex relative">
                  <span className="message-username">
                    {message.username}
                  </span>
                  <div className="message-data-time">{handleDate(new Date(Number(message.date)))}</div>
                </div>
                <div className="message">{message.message}</div>
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
      <div className="chat-history scrollbar">
        {renderChatHistory()}
      </div>
      <div className="global-chat-input-container">
        <form onSubmit={(e) => { submitMessage(e); }}>
          <input ref={inputRef} onChange={(e) => setMessage(e.target.value)} type="text" className="global-chat-input" placeholder="Aa" value={message} />
        </form>
        <div className="emoji-container">
          <img onClick={(e) => showEmojiModal(e)} alt="emoji" className="emoji-button align-items-center" src={Smileyface} />
          <div className="emoji-modal hidden">
            <div className="emoji-backdrop" onClick={(e) => { hideEmojiModal(e); }} />
            <Picker
              className="emojis"
              pickerStyle={{
                width: '250px', position: 'absolute', bottom: '55px', right: '1rem',
              }}
              onEmojiClick={onEmojiClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
