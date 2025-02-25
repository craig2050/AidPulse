import React from 'react';

function MessageList({ messages }) {
  return (
    <div className="MessageList">
      {messages.map((message, index) => (
        <div key={index} className="Message">
          {message}
        </div>
      ))}
    </div>
  );
}

export default MessageList;