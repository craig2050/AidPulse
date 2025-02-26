import React, { useEffect, useState } from "react";
import "./Chat.css";
import MessageList from "./Message/MessageList";
import MessageInput from "./Message/MessageInput";
import data from "../../questions.json";

function Chat({ onSelectComponent }) {
  const combinedData = Object.values(data).reduce((acc, section) => {
    if (section.data && Array.isArray(section.data)) {
      acc.push(...section.data);
    }
    return acc;
  }, []);
  console.log(combinedData);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const objectWithEmptyValue = combinedData.find(item => item.value === "");
    if (objectWithEmptyValue) {
      // Pass objectWithEmptyValue to LLM
      console.log("Object with empty value:", objectWithEmptyValue);
      // Add your LLM call here
    }
  }, [combinedData]);

  const handleSendMessage = (message) => {
    setMessages([...messages, message]);
  };

  return (
    <div className="Chat">
      <button className="back-button" onClick={() => onSelectComponent("Home")}>
        Back
      </button>
      <MessageList messages={messages} />
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
}

export default Chat;
