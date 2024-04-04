import React, { useEffect, useState } from "react";
import "../../styles/MyPage.css"
import http from "../../utils/http"

const MyPage = () => {
    const [imgPreView, setImgPreView] = useState([]);

    useEffect(() => {

        const fetchData = async () => {
            const response = await http.get(`user/getUserImg`);

            setImgPreView(response.data.userImg);
        }
        fetchData();
    }, []);

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
        <>
            <div className="myPage-contain">
                <div className="myPage-banner">
                    계정 정보
                </div>
                <form action="" className="myPage-content">

                    <div className="myPage-profile-img-contain">
                        <h1>프로필 이미지</h1>
                        <div className="profile-img">
                            <img src={imgPreView} id="preview-img" />
                            <div>
                                <label htmlFor="file">
                                    <div className="profile-change">변경</div>
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*, video/*"
                                        onChange={handleImgPreview}
                                        id="file"
                                    />
                                </label>
                                <p>확장자: png, jpg, jpeg / 용량: 1MB 이하 </p>
                            </div>
                        </div>
                    </div>

                    <div className="myPage-bottom">
                        <h1>닉네임</h1>
                        <p>한글, 영문(대소문자), 숫자 조합 / 2~18자 이하</p>
                        <input type="text" />

                        <h1>자기 소개</h1>
                        <textarea name="" id="" cols="30" rows="10"></textarea>
                    </div>
                    <button> 저장하기 </button>
                </form>
            </div>

        </>
    )
}

export default MyPage