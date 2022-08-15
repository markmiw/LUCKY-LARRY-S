import React, { useState, useRef } from 'react';
import * as moment from 'moment';
import Picker from 'emoji-picker-react';
import flags from '../Flag.jsx';
import Smileyface from '../../../../dist/icons/smile-regular.svg';

function handleDate(date) {
  // if date is today return 11:01 AM
  if (moment(date).isSame(moment(), 'day')) {
    return `Today at ${moment(date, ['x']).format('h:mm A')}`;
  } if (moment(date).isSame(moment().subtract(1, 'day'), 'day')) {
    return `Yesterday at ${moment(date, ['x']).format('h:mm A')}`;
  } if (moment(date).isBefore(moment().subtract(1, 'day'), 'day')) {
    return `${moment(date, ['x']).format('ddd hh:mm A')}`;
  }
  return `${moment(date, ['x']).format('MMM Do, yyyy, h:mm A')}`;
}

function Chat({}) {
  const [inputStr, setInputStr] = useState('');
  const inputRef = useRef(null);
  const onEmojiClick = (e, emojiObject) => {
    const { selectionStart, selectionEnd } = inputRef.current;
    const newVal = inputStr.slice(0, selectionStart) + emojiObject.emoji + inputStr.slice(selectionEnd);
    setInputStr(newVal);
  };

  function hideEmojiModal(e) {
    e.preventDefault();
    document.getElementsByClassName('emoji-modal')[0].classList.add('hidden');
  }

  function showEmojiModal(e) {
    e.preventDefault();
    document.getElementsByClassName('emoji-modal')[0].classList.remove('hidden');
  }
  const messages = [{
    username: 'mark',
    country: 'USA',
    date: Date.now() - 864000,
    message: 'yooooo',
  },
  {
    username: 'mark2',
    country: 'USA',
    date: Date.now(),
    message: 'yooooo2',
  },
  {
    username: 'mark3',
    country: 'USA',
    date: Date.now(),
    message: 'yooooo3',
  },
  {
    username: 'mark2',
    country: 'USA',
    date: Date.now(),
    message: 'yooooo2',
  },

  ];
  const username = 'mark';

  return (
    <div className="chat">

      <div className="chat-history">
        <ul className="m-b-0">
          {messages.map((message) => (
            <li className="display-flex">
              <img className="global-chat-country" alt="country" src={flags[message.country]} />
              <div className="message-data">
                <div className="display-flex relative">
                  <span className="message-username">
                    {message.username}
                  </span>
                  <div className="message-data-time">{handleDate(message.date)}</div>
                </div>
                <div className="message">{message.message}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="global-chat-input-container">
        <input ref={inputRef} onChange={(e) => setInputStr(e.target.value)} type="text" className="global-chat-input" placeholder="Aa" value={inputStr} />
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

export default Chat;
