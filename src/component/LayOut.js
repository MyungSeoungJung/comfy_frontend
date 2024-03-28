import React, { useState } from "react";
import { SiSpeedtest } from "react-icons/si";
import "../styles/LayOut.css";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";

function LayOut() {

  // const [modalHandle, setModalHandle] = useState(false)
  return (
    <div >
      <div className="layout">
        <div className="navigation">
          {/* navi */}
          <div className="inner">
            <h1 className="logo">
              <a href=""></a>
            </h1>
            <div className="tabs">
              <ul>
                <li className="home">
                  <SiSpeedtest />
                  <Link to="">홈 </Link>
                </li>
                <li className="adminpost">
                  {" "}
                  <SiSpeedtest />
                  <a href=""> 알림 </a>{" "}
                </li>
                <li className="makeroom">
                  {" "}
                  <SiSpeedtest />
                  <Link to="CreateStudyGruop">스터디 만들기 </Link>
                </li>
                <li className="room">
                  {" "}
                  <SiSpeedtest />
                  <a href=""> 스터디 리스트 </a>{" "}
                </li>
                <li className="info">
                  {" "}
                  <SiSpeedtest />
                  <a href=""> 나의 프로필 </a>
                </li>
              </ul>
            </div>
          </div>
          {/* navi */}
        </div>
        {/* 컨텐츠 영역 */}
        <div className="contents">
          <main style={{ width: "100%", height: "100%", }} className="main">
            <Outlet />
          </main>
        </div>
        {/* 컨텐츠 영역 */}
      </div>

    </div>
  );
}

export default LayOut;
