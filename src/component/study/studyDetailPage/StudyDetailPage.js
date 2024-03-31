import "../../../styles/StudyDetailPage.css";
import { IoHeartOutline } from "react-icons/io5";
import { IoHeartSharp } from "react-icons/io5";
import { IoChatbubbleOutline } from "react-icons/io5";
import React, { useEffect, useState } from "react";
import http from "../../../utils/http";

const StudyDetailPage = () => {
    const [heartFilled, setHeartFilled] = useState(false);
    const [study, setStudy] = useState([]);
    const [totalHearts, setTotalHearts] = useState(0);

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

    const formatCreateTime = (createTime) => {
        if (!createTime) return ""; // 빈 값인 경우 빈 문자열 반환
        const date = new Date(createTime[0], createTime[1] - 1, createTime[2], createTime[3], createTime[4], createTime[5], createTime[6] / 1000000);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString().slice(2);

        return `${day}.${month}.${year}`;
    };
    useEffect(() => {
        const fetchData = async () => {
            const id = window.location.search;
            const response = await http.get(`study/studyDetailPage${id}`);
            setStudy(response.data)
            setTotalHearts(response.data.totalHearts);
        }
        fetchData();
    }, []);
    return (
        <>
            <div className="studyDetail-warpper">
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
                    <div className="study-item-horizontal"></div>

                    <div className="similar-study" >
                        <ul>
                            <li> 비슷한 컨텐츠 </li>
                        </ul>
                    </div>
                </div>
                <div className="studyDetail-side">
                    <div className="study-writerInfo">
                        <div> <h1> 작성자 </h1>
                            <p> 작성한 스터디</p>
                        </div>
                        <div className="wrtier-img">
                            img
                        </div>
                    </div>
                    <div className="studyDetail-comment">
                        <div className="studyDetail-comment-view">댓글 보여주는곳</div>
                        <div className="studyDetail-comment-heart" onClick={handleHeartClick}>
                            {heartFilled ? <IoHeartSharp className="fill-heart" /> : <IoHeartOutline className="empty-heart" />}
                            <IoChatbubbleOutline className="chat-icon" />
                            <div className="studyDetail-totalHeart">{totalHearts} Like</div>
                        </div>
                        <div className="studyDetail-comment-write">
                            <input type="text" placeholder="add comment" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default StudyDetailPage;