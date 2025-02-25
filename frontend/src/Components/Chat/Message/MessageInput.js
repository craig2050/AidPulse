import React, { useState } from 'react';

function MessageInput({ onSendMessage }) {
  const [message, setMessage] = useState('');

  const userMessage = (message) => {
    // Call the llmresponse hook with the message
    llmresponse(message);
  };

  const llmresponse = (message) => {
    // Logic for handling the response from the LLM
    console.log("LLM response for message:", message);
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      userMessage(message); // Call userMessage hook
      setMessage('');
    }
  };

  return (
    <div className="MessageInput">
      <input
        type="text"
        value={message}
        onChange={handleChange}
        placeholder="Type your message"
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default MessageInput;