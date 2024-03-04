import React, { useState, useEffect } from "react";
import "../styles/Chatbot.css";

const SocketChat = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  const sendMessage = () => {
    // 메시지 전송 로직을 구현할 수 있음
    // 이 예시에서는 메시지를 단순히 출력하도록 함
    console.log("Sending message:", inputMessage);
    setInputMessage("");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  useEffect(() => {
    const messageContainer = document.querySelector(".message-container");
    if (messageContainer) {
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="messageBox">
      <div className="message-top">
        {/* 닫기 버튼 */}
        <button onClick={onClose} className="close-button">
          Close
        </button>
      </div>
      {/* 메시지 출력 부분 */}
      <div className="message-container">
        {messages.map((message, index) => (
          <div key={index} className="messageSmallBox">
            <span className="userName">{message.userName}</span>
            <div className="message">
              <p>{message.content}</p>
            </div>
            <span className="timestamp">{message.timestamp}</span>
          </div>
        ))}
      </div>
      {/* 메시지 입력 부분 */}
      <div className="text-box">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={sendMessage}>전송</button>
      </div>
    </div>
  );
};

export default SocketChat;
