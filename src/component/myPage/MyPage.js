import React, { useEffect, useState } from "react";
import "../../styles/MyPage.css";
import http from "../../utils/http";
import { isLocalhost } from "../../utils/DomainUrl"
import Pagination from "react-js-pagination";
import { IoIosHeartEmpty } from "react-icons/io";
import { PiChatCircle } from "react-icons/pi";
import { formatCreateTime } from "../../utils/formatCreateTime";
import { useNavigate } from "react-router-dom";
import StudyModifyModal from "../myPage/StudyModifyModal";

const MyPage = () => {
    const [userInfo, setUserInfo] = useState({
        nickname: "",
        introduction: "",
        userImg: ""
    });
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [study, setStudy] = useState([]);
    const [studyId, setStudyId] = useState([]);
    let uuidFilename = userInfo.userImg;
    const [studyModifyHandle, setStudyModifyHandle] = useState(false);

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

    // 페이지네이션
    const handlePageChange = async (pageNumber) => {
        try {
            const response = await http.get('/study/getMyStudy', {
                params: {
                    page: pageNumber, // 변경된 페이지 번호
                    size: 3 // 페이지 당 아이템 수
                }
            });
            setStudy(response.data.content)
            setTotalPages(response.data.totalPages)
            setPage(pageNumber);
        } catch (error) {
            console.error('Error fetching study data:', error);
            // 에러 처리 로직 추가
        }
    };
    // 페이지 네이션 useEffect
    useEffect(() => {
        handlePageChange(page);
    }, [page == 0]);

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


    const openStudyModify = (id) => {
        setStudyModifyHandle(true);
        setStudyId(id)
    };

    const closeStudyModify = () => {
        setStudyModifyHandle(false);
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
                        <img src={`${isLocalhost()}user/file/${uuidFilename}`} id="preview-img" alt="프로필 이미지 미리보기" />
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
            <div className="my-study-info">
                <div>
                    <button>전체</button>
                    <button>모집중</button>
                    <button>모집완료</button>
                </div>
                {/* 내가 작성한 스터디 */}
                <div className="my-study-list">
                    {study.map((study, idx) => (
                        <div id="myPage-content-contain"
                            key={"study-id-" + study.id + "," + idx}
                            onClick={() => openStudyModify(study.id)}>
                            <div id="myPage-content-top">
                                <h1>{study.title}</h1>
                            </div>
                            <div id="myPage-content-middle">{study.content}</div>
                            <div id="myPage-content-bottom">
                                <span id="myPage-recruit-status">{study.recruitStatus}</span>
                                <div><span style={{ marginTop: "2px" }}>{formatCreateTime(study.createdTime)}</span></div>
                                <div><IoIosHeartEmpty /><span>{study.totalHeart}</span> <PiChatCircle /><span>{study.totalComment}</span></div>
                            </div>
                        </div>
                    ))}
                </div>
                <Pagination
                    activePage={page}
                    itemsCountPerPage={1}
                    // 총 리스트 페이지네이션 숫자
                    totalItemsCount={totalPages}
                    pageRangeDisplayed={5}
                    prevPageText={"‹"}
                    nextPageText={"›"}
                    firstPageText={"«"}
                    lastPageText={"»"}
                    onChange={handlePageChange}
                />
            </div>
            <div className="my-commnet-info">내가 작성한 댓글</div>
            {studyModifyHandle && <StudyModifyModal onClose={closeStudyModify} studyId={studyId} />}
        </div>

    );
};

export default MyPage;
