import React, { useState } from "react";
import { SiSpeedtest } from "react-icons/si";
import "../styles/LayOut.css";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";

function LayOut() {
  // const [modalHandle, setModalHandle] = useState(false)
  return (
    <div >
      <div className="navigation">
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
      </div>
      <div className="contents">
        <main style={{
          width: "100%", height: "100%",
        }} className="main">
          <Outlet />
        </main>
      </div>
      {/* 주석 */}
      {/* <div className="contents">
        <div className="main">
          <div className="section">
            <div className="rooms">
              <div className="head">
                <a href="/">
                  <i> ICON </i>

                </a>
              </div>
              <div className="middle">
                <div className="box">여기에 제목이나 글내용</div>
              </div>
              <div className="low">
                <div className="likes">
                  <div className="heart">
                    <CiHeart />
                  </div>
                  <a href="/">좋아요 0 개</a>
                </div>
              </div>
            </div>
            <div className="rooms">
              <div className="head">
                <a href="/">
                  <i> ICON </i>
                </a>
              </div>
              <div className="middle">
                <div className="box">여기에 제목이나 글내용</div>
              </div>
              <div className="low">
                <div className="likes">
                  <div className="heart">
                    <CiHeart />
                  </div>
                  <a href="/">좋아요 0 개</a>
                </div>
              </div>
            </div>
            <div className="rooms">
              <div className="head">
                <a href="/">
                  <i> ICON </i>
                </a>
              </div>
              <div className="middle">
                <div className="box">여기에 제목이나 글내용</div>
              </div>
              <div className="low">
                <div className="likes">
                  <div className="heart">
                    <CiHeart />
                  </div>
                  <a href="/">좋아요 0 개</a>
                </div>
              </div>
            </div>
          </div>
          <div className="hots">
            <div className="items">
              <h4> 인기 번개 </h4>
              <ul>
                <li>
                  <a href="/">
                    <div className="head"> 이름이 </div>
                    <div className="middle">
                      <p> 제목 or 내용 1</p>
                    </div>
                  </a>
                </li>
              </ul>
              <ul>
                <li>
                  <a href="/">
                    <div className="head"> 이름이 </div>
                    <div className="middle">
                      <p> 제목 or 내용 2 </p>
                    </div>
                  </a>
                </li>
              </ul>
              <ul>
                <li>
                  <a href="/">
                    <div className="head"> 이름이 </div>
                    <div className="middle">
                      <p> 제목 or 내용 3 </p>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="search">
            <div className="inner">
              <input type="text" placeholder="검색하기" />
              <ul>
                <li>
                  <h4 className="search_title"> 번개 히스토리 </h4>
                  <a href="/">
                    <div className="title"> 제주도 3박 4일 ㄱㄱ? </div>
                    <button> 삭제 </button>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div> */}
      {/* 주석 */}

    </div>
  );
}

export default LayOut;
