import React, { useEffect } from "react";
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
import StudyDetailPage from "./component/study/studyDetailPage/StudyDetailPage.js";
import MyPage from "./component/myPage/MyPage.js";
import TabComponent from "./component/tabComponent/TabComponent.js";
import ChatModal from "./component/chatting/ChatModal.js";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getCookie('token');
    if (!token && window.location.pathname !== '/SignUp') {
      navigate('/login', { replace: true });
    } else if (token) {
      const decodedToken = token;
      const currentTime = Date.now() / 1000; // 현재 시간(밀리초 단위)을 초 단위로 변환
      if (decodedToken.exp < currentTime) { // 만료 시간과 현재 시간을 비교하여 토큰이 만료되었는지 확인
        navigate('/login', { replace: true }); // 토큰이 만료되었으면 리다이렉션
      }
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
          <Route key="StudyDetailPage" path="study/:id" element={<StudyDetailPage />} />
          <Route key="MyPage" path="MyPage" element={<MyPage />} />
          <Route key="TabComponent" path="TabComponent" element={<TabComponent />} />
          <Route key="ChatModal" path="ChatModal" element={<ChatModal />} />
        </Route>
      </Routes>

      {/* 채팅위젯 및 추천위젯 */}
      <ChatWidget />
      <RecoWidget />
    </div>
  );
}

export default App;
