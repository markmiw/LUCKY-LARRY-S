import React, { useState } from 'react';
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

function Chat(props) {
  const [inputStr, setInputStr] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState(null);

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  };

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
        <input onChange={(e) => setInputStr(e.target.value)} type="text" className="global-chat-input" placeholder="Aa" />
        <div className="emoji-container">
          <img onClick={() => setShowPicker((val) => !val)} alt="emoji" className="emoji-button align-items-center" src={Smileyface} />
          {showPicker && <Picker
          pickerStyle={{ width: '300px', position: "fixed", bottom: "130px" }}
          onEmojiClick={onEmojiClick} />}
        </div>
      </div>

    </div>
  );
}

export default Chat;

{ /* <div classNameName="global-chat-container">
      <div classNameName="global-chat-message-container">
        {messages.map((message, i) => (
          <div classNameName="global-message-container" key={i}>
            <img classNameName="global-message-country" src={flags[message.country]} alt="user-country" />
            <div classNameName="global-message-container-inner">
              <div classNameName="global-chat-username-date-container">
                <span classNameName="chat-username">
                  {message.username}
                </span>
                <span classNameName="global-chat-date">
                  {moment(message.date).fromNow()}
                </span>
              </div>
              <span classNameName="global-chat-message">
                {message.message}
              </span>
            </div>
          </div>
        ))}
        <div classNameName="global-chat-input-container">
          <input classNameName="global-chat-input" type="text" placeholder="Aa" />
          <img alt='emoji-button' src={Smileyface}></img>
        </div>
      </div>
    </div> */ }
