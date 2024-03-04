import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./reset.css";
import Login from "./component/Login.js";
import Signup from "./component/Signup.js";
import Main from "./component/Main.js";
import ChatWidget from "./component/ChatWidget.js";

function App() {
  return (
    <div className="App" id="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Main" element={<Main />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      {/* 채팅위젯 */}
      <ChatWidget />
    </div>
  );
}

export default App;
