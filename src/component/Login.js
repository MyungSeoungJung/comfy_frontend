import React from "react";
import { Link } from "react-router-dom";
import "../styles/Login.css";

function Login() {
  return (
    <div className="login">
      <div className="logo_position">
        <div className="logo"></div>
      </div>
      <div className="login_top">
        <ul className="login_line">
          <li className="login_login">
            <Link to="/login"> Login </Link>
          </li>
          <li className="login_signup">
            <Link to="/SignUp"> Sign Up </Link>
          </li>
        </ul>
      </div>
      <div className="login_form">
        {/*  */}
        <form action="http://localhost:8080/auth/signIn" method="post">
          <div className="login_input">
            <input
              name="email"
              type="text"
              className="login_email"
              placeholder="이메일"
            />
          </div>
          <div className="login_input">
            <input
              name="password"
              type="password"
              className="login_password"
              placeholder="비밀번호"
            />
          </div>
          <div className="btn_login">
            <button className="login_btn" type="submit">
              {" "}
              로그인
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
