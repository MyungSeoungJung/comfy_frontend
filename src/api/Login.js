import axios from "axios";

// API 서버의 기본 URL 설정
const baseURL = process.env.REACT_APP_BASE_URL;
const axiosInstance = axios.create({
  baseURL,
});

export const postLogin = async (data) => {
  try {
    const response = await axiosInstance.post("/auth/login", data);
    const token = response.data.token;
    // 로그인 성공 시 메인 페이지로 이동
    window.location.href = "/";
    if (token) {
      localStorage.setItem("ACCESS_TOKEN", token);
    }
  } catch (error) {
    // 에러 처리 코드
  }
};
