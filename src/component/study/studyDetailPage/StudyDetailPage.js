import "../../../styles/StudyDetailPage.css";
import { IoHeartOutline } from "react-icons/io5";
import { IoHeartSharp } from "react-icons/io5";
import { IoChatbubbleOutline } from "react-icons/io5";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import http from "../../../utils/http";

const StudyDetailPage = () => {
    const navigate = useNavigate();
    const [heartFilled, setHeartFilled] = useState(false);
    const [study, setStudy] = useState({});
    const [totalHearts, setTotalHearts] = useState(0);
    const commentRef = useRef();
    const [studyComment, setStudyComment] = useState([]);
    const [userInfo, setUserInfo] = useState({ userImg: "", userNickName: "" });

    const handleHeartClick = async () => {
        const id = window.location.search;
        try {
            if (heartFilled) {
                await http.delete(`heart${id}`);
                setHeartFilled(false);
                setTotalHearts(totalHearts - 1);
            } else {
                await http.post(`heart${id}`);
                setHeartFilled(true);
                setTotalHearts(totalHearts + 1);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
    // 채팅 이동
    const handleChat = () => {
        navigate(`/ChatModal?toUserId=${study.writerId}`);
    }

    const formatCreateTime = (createTime) => {
        if (!createTime) return ""; // 빈 값인 경우 빈 문자열 반환
        const date = new Date(createTime[0], createTime[1] - 1, createTime[2], createTime[3], createTime[4], createTime[5], createTime[6] / 1000000);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString().slice(2);

        return `${year}.${month}.${day}`;
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const id = window.location.search;

                // 스터디 정보 가져오기
                const studyResponse = await http.get(`study/studyDetailPage${id}`);
                setStudy(studyResponse.data);
                setTotalHearts(studyResponse.data.totalHearts);
                setHeartFilled(studyResponse.data.userLikedStudy);

                // 댓글 가져오기
                const commentResponse = await http.get(`studyComment/getComment${id}`);
                setStudyComment(commentResponse.data);

                // 사용자 정보 가져오기
                const imgResponse = await http.get(`user/getUserInfo`);
                setUserInfo({ userImg: imgResponse.data.userImg, userNickName: imgResponse.data.userNickName });

            } catch (error) {
                console.error("Error fetching data:", error);
                // 에러 처리
            }
        };

        fetchData();
    }, []);
    const addComment = async (e) => {
        e.preventDefault();
        const id = window.location.search;
        const data = {
            content: commentRef.current.value,
        }
        const response = await http.post(`studyComment/addComment${id}`, data);

        const newComment = {
            userNickName: userInfo.userNickName,
            content: commentRef.current.value,
            userImg: userInfo.userImg,
        };
        setStudyComment([...studyComment, newComment]);
        commentRef.current.value = "";
        console.log(response);
    }

    // const handleImgPreview = (event) => {
    //     const files = event.target.files;
    //     const previews = [];

    //     for (let i = 0; i < files.length; i++) {
    //         const file = files[i];
    //         const reader = new FileReader();

    //         reader.onload = (e) => {
    //             previews.push(e.target.result);

    //             if (previews.length === files.length) {
    //                 setUserInfo(previews);
    //             }
    //         };

    //         reader.readAsDataURL(file);
    //     }
    // };

    return (
        <>
            <div className="studyDetail-warpper">
                <div className="create-study-banner">
                    <h1>지식을 나누고 함께 성장하는 공간을 만들어보세요! </h1>
                    <p>스터디를 만들고 함께 성장하는 커뮤니티에 참여해 보세요.</p>
                </div>
                <div className="studyDetail-content-wrapper">
                    <div className="studyDetail-contain">
                        <div className="studyDetail-top" >
                            <h1> {study.title}</h1>
                            <p>{formatCreateTime(study.createdTime)} 작성</p>
                        </div>
                        <div className="study-item-horizontal"></div>
                        <div className="studyDetail-content" >
                            <p>
                                {study.content}
                            </p>
                        </div>
                        <div className="study-detail-tag">
                            {study.hashTags && study.hashTags.map((hashTag) => (
                                <button><span>{hashTag}</span></button>
                            ))}
                        </div>
                        <div className="study-item-horizontal"></div>

                        <div className="similar-study" >
                            <ul>
                                <li> 비슷한 컨텐츠 </li>
                            </ul>
                        </div>
                    </div>
                    <div className="studyDetail-side">
                        <div className="study-writerInfo">
                            <div> <h1> {study.creatorNickName} </h1>
                                <p> 작성한 스터디</p>
                            </div>
                            <div className="wrtier-img">
                                <img src={study.writerImg} alt="" />
                            </div>
                        </div>
                        {/* 댓글 영역 */}
                        <div className="studyDetail-comment">
                            <div className="studyDetail-comment-view">
                                {studyComment.map((studyComment, idx) => (
                                    <div className="comment-content">
                                        <img src={userInfo.userImg} id="comment-profile-img" />
                                        <div><h2>{studyComment.userNickName}</h2>  <p>{studyComment.content}</p></div>
                                    </div>

                                )
                                )}

                            </div>
                            <div className="studyDetail-comment-heart">
                                <div>{heartFilled ? <IoHeartSharp className="fill-heart" onClick={handleHeartClick} /> : <IoHeartOutline className="empty-heart" onClick={handleHeartClick} />}
                                    <IoChatbubbleOutline className="chat-icon" writerId={study.writerId} onClick={handleChat} />
                                    <span id="recruit-status"> 모집중 </span>
                                </div>
                                <div className="studyDetail-totalHeart">{totalHearts} Like</div>
                            </div>
                            <div className="studyDetail-comment-write">
                                <input ref={commentRef} type="text" placeholder="add comment" />
                                <button onClick={addComment}>전송</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default StudyDetailPage;