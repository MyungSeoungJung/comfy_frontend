import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // axios 임포트
import "../styles/Login.css";

function Signup() {
  // 필드 초기값 설정
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // 기본 제출 이벤트 방지c

    // 입력한 정보를 가공하여 데이터 객체로 만듭니다.
    const data = {
      email: email,
      nickName: nickname,
      password: password,
    };

    try {
      // 가입 요청을 보냅니다.
      const response = await axios.post(`${baseURL}auth/signUp`, data);

      // 가입이 성공하면 로그인 페이지로 이동
      window.location.href = "/Login";
    } catch (error) {
      // 가입 실패 시 에러 처리 코드
      console.error("가입 실패:", error);
    }
  };

  return (
    <div className="login">
      <div className="logo_position">
        <div className="logo"></div>
      </div>
      <div className="login_top">
        <ul className="login_line">
          <li className="login_login">
            <Link to="/Login"> Login </Link>
          </li>
          <li className="login_signup">
            <Link to="/SignUp"> Sign Up </Link>
          </li>
        </ul>
      </div>
      <div className="signup_form">
        <form onSubmit={handleSubmit}>
          <div className="signup_input">
            <div className="input_email">
              <input
                type="text"
                className="signup_email"
                placeholder="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {/* 이메일 인증 버튼 추가 */}
              <button className="email_verify"> 인증하기 </button>
            </div>
          </div>
          <div className="signup_input">
            <input
              type="text"
              className="signup_nickname"
              placeholder="닉네임"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>
          <div className="signup_input">
            <input
              type="password"
              className="signup_password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="signup_input">
            <input
              type="password"
              className="signup_password_check"
              placeholder="비밀번호확인"
              value={passwordCheck}
              onChange={(e) => setPasswordCheck(e.target.value)}
            />
          </div>
          <div className="btn_login">
            <button className="login_btn" type="submit">
              {" "}
              가입진행
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
