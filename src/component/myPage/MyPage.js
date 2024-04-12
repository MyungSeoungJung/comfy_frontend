import React, { useEffect, useState } from "react";
import "../../styles/MyPage.css";
import http from "../../utils/http";

const MyPage = () => {


    const [userInfo, setUserInfo] = useState({
        nickname: "",
        introduction: "",
        userImg: ""
    });

    let uuidFilename = userInfo.userImg;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await http.get(`user/getUserInfo`);
                const { userNickName, introduce, userImg } = response.data;
                setUserInfo({
                    nickname: userNickName,
                    introduction: introduce,
                    userImg: userImg
                });
            } catch (error) {
                console.error("Failed to fetch user information:", error);
            }
        };
        fetchData();
    }, []);

    const handleNicknameChange = (event) => {
        setUserInfo({
            ...userInfo,
            nickname: event.target.value
        });
    };

    const handleIntroductionChange = (event) => {
        setUserInfo({
            ...userInfo,
            introduction: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await http.put("user/putUserInfo", userInfo); // 서버로 수정된 정보를 전송
            alert("정보가 업데이트되었습니다.");
        } catch (error) {
            console.error("Failed to update user information:", error);
            alert("정보 업데이트에 실패했습니다.");
        }
    };

    return (
        <div className="myPage-contain">
            <div className="myPage-banner">
                계정 정보
            </div>
            <form onSubmit={handleSubmit} className="myPage-content">
                <div className="myPage-profile-img-contain">
                    <h1>프로필 이미지</h1>
                    <div className="profile-img">
                        <img src={`http://192.168.0.23:8080/user/file/${uuidFilename}`} id="preview-img" alt="프로필 이미지 미리보기" />
                        <div>
                            <label htmlFor="file">
                                <div className="profile-change">변경</div>
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*, video/*"
                                    id="file"
                                />
                            </label>
                            <p>확장자: png, jpg, jpeg / 용량: 1MB 이하</p>
                        </div>
                    </div>
                </div>
                <div className="myPage-bottom">
                    <h1>닉네임</h1>
                    <p>한글, 영문(대소문자), 숫자 조합 / 2~18자 이하</p>
                    <input
                        type="text"
                        value={userInfo.nickname}
                        onChange={handleNicknameChange}
                    />
                    <h1>자기 소개</h1>
                    <textarea
                        value={userInfo.introduction}
                        onChange={handleIntroductionChange}
                        cols="30"
                        rows="10"
                    ></textarea>
                </div>
                <button type="submit">저장하기</button>
            </form>
        </div>
    );
};

export default MyPage;
