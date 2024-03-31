import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/CreateStudyGroup.css"
import WriteModal from "../writeModal/WriteModal";
import http from "../../utils/http";

const CreateStudyGruop = () => {
    const [writeModalHandle, setWriteModalHandle] = useState(false);
    const [study, setStudy] = useState([]);
    const navigate = useNavigate();

    const openWriteModal = () => {
        setWriteModalHandle(true);
    };

    const closeWriteModal = () => {
        setWriteModalHandle(false);
    };
    // study Get
    useEffect(() => {
        const fetchData = async () => {
            const response = await http.get("study/getStudy");
            setStudy(response.data)
        };
        fetchData();
    }, []);

    const handleStudyClick = (studyId) => {
        // 클릭된 게시물의 ID를 사용하여 URL을 생성
        const url = `/study/studyDetailPage?id=${studyId}`;
        // 생성된 URL로 페이지를 이동
        navigate(url);
    };

    return (
        <div className="create-study-wrapper">
            <div className="create-study-banner">sd</div>
            <div className="create-study-body">
                {/* 검색 상단 */}
                <div className="create-study-center">
                    <div className="create-study-contain">
                        <div className="create-study-state">
                            <button>전체</button>
                            <button>모집중</button>
                            <button>모집 완료</button>
                        </div>

                        {/* 검색창 */}
                        <div className="create-study-search">
                            <div><input type="text" placeholder="스터디를 검색하세요" /> <button>검색</button></div>
                            <div> <input type="text" placeholder="태그로 검색하세요" /> <button>초기화</button> </div>
                        </div>
                        {/* 검색창 */}

                        {/* 게시글 컨테이너 영역 */}
                        <div className="create-study-content">
                            <div className="create-study-content-top">
                                <div><button>최신순</button><button>최신순</button></div>
                                <div> <button onClick={openWriteModal}>글쓰기</button></div>
                            </div>


                            {/* 컨텐츠 영역*/}
                            <div className="create-study-content-main">
                                {/* 게시글*/}
                                {study.map((study, idx) => (
                                    <div id="stduy-content-contain"
                                        key={"study-id-" + study.id + "," + idx}
                                        onClick={() => handleStudyClick(study.id)}>
                                        <div id="study-content-top">
                                            <span>{study.recruitStatus}</span> <h3>{study.title}</h3>
                                        </div>

                                        <div id="study-content-middle">{study.content}</div>
                                        <div id="study-content-bottom">
                                            <div><span>{study.creatorNickName}</span> <span>{study.createdTime}</span></div>
                                            <div><span>좋아요</span> <span>{study.totalComment}</span></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {/* 컨텐츠 영역*/}

                        </div>
                        {/* 게시글 부분 */}
                    </div>
                    {/* 검색 상단 */}
                </div>
                {/* side 인기태그 */}
                <aside className="create-study-side">
                    <p>인기 태그</p>
                </aside>
                {/* side 인기태그 */}
                {writeModalHandle && <WriteModal isOpen={openWriteModal} onClose={closeWriteModal} />}
            </div>
        </div>

    );
}

export default CreateStudyGruop;