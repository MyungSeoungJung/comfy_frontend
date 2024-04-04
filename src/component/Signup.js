import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Login.css";
// 기본 이미지 URL
const defaultImageUrl = "/assets/simple_profile_img.png";

function Signup() {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const fileRef = useRef();
  const [imgPreView, setImgPreView] = useState([]);
  const baseURL = process.env.REACT_APP_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 이미지를 등록하지 않았을 경우 기본 이미지 URL을 사용하고, 등록했을 경우에는 업로드한 이미지 URL을 사용합니다.
    const imageUrlToSend = imgPreView.length > 0 ? imgPreView[0] : defaultImageUrl;

    const data = {
      email: email,
      nickName: nickname,
      password: password,
      profileImage: imageUrlToSend,
    };

    try {
      const response = await axios.post(`${baseURL}auth/signUp`, data);
      console.log(response);
      window.location.href = "/Login";
    } catch (error) {
      console.error("가입 실패:", error);
    }
  };

  const handleImgPreview = (event) => {
    const files = event.target.files;
    const previews = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = (e) => {
        previews.push(e.target.result);

        if (previews.length === files.length) {
          setImgPreView(previews);
        }
      };

      reader.readAsDataURL(file);
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
            <Link to="/login"> Login </Link>
          </li>
          <li className="login_signup">
            <Link to="/SignUp"> Sign Up </Link>
          </li>
        </ul>
      </div>
      <div className="signup_form">
        <form onSubmit={handleSubmit}>
          <div className="signup_input">
            <div className="profile-img">
              {imgPreView.length > 0 ? (
                imgPreView.map((preview, index) => (
                  <img key={index} src={preview} id="preview-img" />
                ))
              ) : (
                <img src={defaultImageUrl} id="preview-img" style={{ width: '100px', height: '100px' }} />
              )}

              <div>
                <label htmlFor="file">
                  <div className="profile-change">변경</div>
                  <input
                    type="file"
                    multiple
                    accept="image/*, video/*"
                    ref={fileRef}
                    onChange={handleImgPreview}
                    id="file"
                  />
                </label>
                <p>확장자: png, jpg, jpeg / 용량: 1MB 이하</p>
              </div>
            </div>
            <div className="input_email">
              <input
                type="text"
                className="signup_email"
                placeholder="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="button" className="email_verify"> 인증하기 </button>
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
