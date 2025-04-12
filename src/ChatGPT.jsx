import React, { useState } from "react";

function ChatBot() {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSendMessage = () => {
    if (inputText.trim() === "") return;
    setMessages([...messages, { text: inputText, sender: "user" }]);
    setInputText("");
  };

  return (
    <div className="chatbot-container">
      <div className="message-history">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Type your message..."
          value={inputText}
          onChange={handleInputChange}
        />
        <button className="send-button" onClick={handleSendMessage}>
          <img src="send-icon.png" alt="Send" />
        </button>
      </div>
    </div>
  );
}

export default ChatBot;
