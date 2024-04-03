import { SiSpeedtest } from "react-icons/si";
import "../styles/LayOut.css";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";

function LayOut() {

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
                  <a href=""> 채팅 </a>{" "}
                </li>
                <li className="info">
                  {" "}
                  <SiSpeedtest />
                  <Link to="MyPage">마이 페이지 </Link>
                </li>
              </ul>
            </div>
          </div>
          {/* navi */}
        </div>
        {/* 컨텐츠 영역 */}
        <main className="outlet">
          <Outlet />
        </main>
        {/* 컨텐츠 영역 */}
      </div>

    </div>
  );
}

export default LayOut;
