// Recommend.js
import React, { useState } from "react";
import "../../styles/RecoWidget.css";

import Recommend from "../reco/Recommend.js";

const RecoWidget = () => {
  const [isChatVisible, setIsChatVisible] = useState(false);

  const toggleChat = () => {
    setIsChatVisible((prev) => !prev);
  };

  const closeChat = () => {
    setIsChatVisible(false);
  };

  return (
    <div className={`reco-widget ${isChatVisible ? "visible" : ""}`}>
      {isChatVisible ? (
        <Recommend onClose={closeChat} />
      ) : (
        <div className="recoicon" onClick={toggleChat}>
          <img src="/assets/recommend.png" alt="Reco Icon" />
        </div>
      )}
    </div>
  );
};

export default RecoWidget;
