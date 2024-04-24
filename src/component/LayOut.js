import "../styles/LayOut.css";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import { CiSquarePlus, CiChat2 } from "react-icons/ci";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { useEffect, useState } from "react";
import http from "../utils/http";
import { isLocalhost } from "../utils/DomainUrl";
import { MdMenu } from "react-icons/md";
function LayOut() {
  const [userInfo, setUserInfo] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await http.get(`user/getUserInfo`);
        setUserInfo(response.data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchData();
  }, []);

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
                {/* <li className="home">
                  <SiSpeedtest />
                  <Link to="">홈 </Link>
                </li> */}
                <li className="makeroom">
                  {" "}
                  <CiSquarePlus />
                  <Link to="">스터디</Link>
                </li>
                <li className="adminpost">
                  {" "}
                  <HiOutlineBellAlert id='HiOutlineBellAlert' />
                  <a href=""> 알림 </a>{" "}
                </li>
                <li className="room">
                  {" "}
                  <CiChat2 />
                  <Link to="ChatModal">채팅</Link>
                </li>
                <li className="info">
                  {" "}
                  <img src={`${isLocalhost()}user/file/${userInfo.userImg}`} style={{ width: "30px", height: "30px", borderRadius: "50%" }} />
                  <Link to="MyPage">마이 페이지 </Link>
                </li>
              </ul>
            </div>
            {/* 더보기 */}
            <div className="PolarisNavigation"><MdMenu /><span>더 보기</span></div>
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
