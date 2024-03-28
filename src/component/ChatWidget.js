// ChatWidget.js
import React, { useState } from "react";
import "../styles/ChatWidget.css";

import CustomChatbot from "./Chatbot.js";

const ChatWidget = () => {
  const [isChatVisible, setIsChatVisible] = useState(false);

  const toggleChat = () => {
    setIsChatVisible((prev) => !prev);
  };

  const closeChat = () => {
    setIsChatVisible(false);
  };

  return (
    <div className={`chat-widget ${isChatVisible ? "visible" : ""}`}>
      {isChatVisible ? (
        <CustomChatbot onClose={closeChat} />
      ) : (
        <div className="chaticon" onClick={toggleChat}>
          <img src="/assets/chat.png" alt="Chat Icon" />
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
