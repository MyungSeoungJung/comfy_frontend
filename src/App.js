import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom"; import "./reset.css";
import { getCookie } from './utils/cookie.js';
import Login from "./component/Login.js";
import Signup from "./component/Signup.js";
import LayOut from "./component/LayOut.js";
import ChatWidget from "./component/ChatWidget.js";
import CreateStudyGruop from "./component/study/CreateStudyGroup.js"
import Home from "./component/Home.js";
function App() {

  const navigate = useNavigate();

  useEffect(() => {
    const token = getCookie('token');
    if (!token) {
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  return (
    <div className="App" id="App">
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<LayOut />}>
          <Route index element={<Home />} />
          <Route key="CreateStudyGruop" path="CreateStudyGruop" element={<CreateStudyGruop />} />
        </Route>
      </Routes>
      {/* 채팅위젯 */}
      <ChatWidget />
    </div>
  );
}

export default App;
