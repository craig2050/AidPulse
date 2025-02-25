import React, { useState } from 'react';
import './Chat.css';
import MessageList from './Message/MessageList';
import MessageInput from './Message/MessageInput';

function Chat({ onSelectComponent }) {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = (message) => {
    setMessages([...messages, message]);
  };

  return (
    <div className="Chat">
      <button className="back-button" onClick={() => onSelectComponent('Home')}>
        Back
      </button>
      <MessageList messages={messages} />
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
}

export default Chat;