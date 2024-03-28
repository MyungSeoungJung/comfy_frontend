import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./reset.css";
import { getCookie } from './utils/cookie.js';

import Login from "./component/Login.js";
import Signup from "./component/Signup.js";
import LayOut from "./component/LayOut.js";
import ChatWidget from "./component/chatbot/ChatWidget.js";
import CreateStudyGruop from "./component/study/CreateStudyGroup.js";
import Home from "./component/Home.js";
import RecoWidget from "./component/reco/RecoWidget.js";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = getCookie('token');
    if (!token && window.location.pathname !== '/SignUp') {
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  return (
    <div className="App" id="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/SignUp" element={<Signup />} />
        <Route path="" element={<LayOut />}>
          <Route index element={<Home />} />
          <Route key="CreateStudyGruop" path="CreateStudyGruop" element={<CreateStudyGruop />} />
        </Route>
      </Routes>

      {/* 채팅위젯 및 추천위젯 */}
      <ChatWidget />
      <RecoWidget />
    </div>
  );
}

export default App;
