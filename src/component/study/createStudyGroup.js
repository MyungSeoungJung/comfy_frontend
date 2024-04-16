import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosHeartEmpty } from "react-icons/io";
import "../../styles/CreateStudyGroup.css"
import WriteModal from "../writeModal/WriteModal";
import http from "../../utils/http";
import { LuRefreshCw } from "react-icons/lu";
import TabComponent from "../tabComponent/TabComponent";
import { isLocalhost } from "../../utils/DomainUrl";
import Pagination from "react-js-pagination";
import '../../styles/Paging.css'

const CreateStudyGruop = () => {
    const [writeModalHandle, setWriteModalHandle] = useState(false);
    const [study, setStudy] = useState([]);
    const [PopularHashTag, setPopularHashTag] = useState([]);
    const [PopularStudy, setPopularStudy] = useState([]);
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);


    const openWriteModal = () => {
        setWriteModalHandle(true);
    };

    const closeWriteModal = () => {
        setWriteModalHandle(false);
    };
    // 인기 글, 인기해시태그 Get
    useEffect(() => {
        const fetchData = async () => {
            const PopularHashTagResponse = await http.get("hashTag/PopularHashTag")
            setPopularHashTag(PopularHashTagResponse.data);

            const PopularStudyResponse = await http.get("study/popularStudy")
            setPopularStudy(PopularStudyResponse.data);
        };
        fetchData();
    }, []);

    // 페이지 네이션
    const handlePageChange = async (pageNumber) => {
        try {
            const response = await http.get('/study/getStudyPaging', {
                params: {
                    page: pageNumber, // 변경된 페이지 번호
                    size: 1 // 페이지 당 아이템 수
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

    //  처음 로딩시 페이지네이션 get
    useEffect(() => {
        handlePageChange(page);
    }, [page == 0]);

    // 스터디 클릭하면 디테일 페이지로 이동
    const handleStudyClick = (studyId) => {
        const url = `/study/studyDetailPage?id=${studyId}`;
        navigate(url);
    };
    //  시간 format
    const formatCreateTime = (createTime) => {
        if (!createTime) return ""; // 빈 값인 경우 빈 문자열 반환
        const date = new Date(createTime[0], createTime[1] - 1, createTime[2], createTime[3], createTime[4], createTime[5], createTime[6] / 1000000);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString().slice(2);

        return `${year}.${month}.${day}`;
    };
    return (
        <div className="create-study-wrapper">
            <div className="create-study-banner">
                <h1>지식을 나누고 함께 성장하는 공간을 만들어보세요! </h1>
                <p>스터디를 만들고 함께 성장하는 커뮤니티에 참여해 보세요.</p>
            </div>
            <div className="create-study-body">
                {/* 검색 상단 */}
                <div className="create-study-center">
                    <div className="create-study-contain">
                        <div className="create-study-state">
                            <TabComponent />
                        </div>

                        {/* 검색창 */}
                        <div className="create-study-search">
                            <div><input type="text" placeholder="스터디를 검색하세요" /> <button>검색</button></div>
                            <div> <input type="text" placeholder="태그로 검색하세요" /><button> <LuRefreshCw />  초기화</button> </div>
                        </div>
                        {/* 검색창 */}

                        {/* 게시글 컨테이너 영역 */}
                        <div className="create-study-content">
                            <div className="create-study-content-top">
                                <div><button>최신순</button></div>
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
                                            <span id="study-recruit-status">{study.recruitStatus}</span> <h3>{study.title}</h3>
                                        </div>

                                        <div id="study-content-middle">{study.content}</div>
                                        <div className="study-content-tag">
                                            {study.tagNames.map((tagName) => (
                                                <button><span>{tagName}</span></button>
                                            ))}
                                        </div>

                                        <div id="study-content-bottom">
                                            <div><span>{study.creatorNickName}</span> <span>{formatCreateTime(study.createdTime)}</span></div>
                                            <div><IoIosHeartEmpty /><span>{study.totalHeart}</span> <span>{study.totalComment}</span></div>
                                        </div>
                                    </div>
                                ))}
                                <div>
                                    <Pagination
                                        activePage={page}
                                        itemsCountPerPage={10}
                                        // 총 리스트 페이지네이션 숫자
                                        totalItemsCount={450}
                                        pageRangeDisplayed={totalPages}
                                        prevPageText={"‹"}
                                        nextPageText={"›"}
                                        onChange={handlePageChange}
                                    />
                                </div>
                            </div>
                            {/* 컨텐츠 영역*/}

                        </div>
                        {/* 게시글 부분 */}
                    </div>
                    {/* 검색 상단 */}
                </div>
                {/* side 인기태그 */}
                <aside className="create-study-side">
                    <div className="PopularHashTag-contain">
                        <div><h2>인기 태그</h2></div>
                        <div>{PopularHashTag.map((hashTag) => (
                            <button><span>{hashTag}</span></button>
                        ))}</div>
                    </div>
                    <div className="popular-study-contain">
                        <div><h2>모집중인 인기 글</h2></div>

                        {PopularStudy.map((study) => {
                            const uuidFilename = study.userImg; // study 객체의 userImg 속성을 변수에 할당
                            return (
                                <div key={study.id}>
                                    <span>{study.title}</span>
                                    <div>
                                        <div>
                                            {/* 인기글 작성자 프로필 이미지 */}
                                            <img src={`${isLocalhost()}user/file/${uuidFilename}`} alt="" />
                                        </div>
                                        <p>{study.userNickName}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </aside>
                {/* side 인기태그 */}
                {writeModalHandle && <WriteModal isOpen={openWriteModal} onClose={closeWriteModal} />}
            </div>
        </div>
    );
}

export default CreateStudyGruop;