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
import { PiChatCircle } from "react-icons/pi";
import { GoPencil } from "react-icons/go";
import { formatCreateTime } from "../../utils/formatCreateTime";

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

    //  처음 로딩시 페이지네이션 get
    useEffect(() => {
        handlePageChange(page);
    }, [page == 0]);

    // 스터디 클릭하면 디테일 페이지로 이동
    const handleStudyClick = (studyId) => {
        const url = `/study/studyDetailPage?id=${studyId}`;
        navigate(url);
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
                                <div><button>최신순</button><button>댓글많은순</button><button>좋아요순</button></div>
                                <div> <button onClick={openWriteModal}><span><GoPencil /></span><span>글쓰기</span></button></div>
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
                                            <div><span>{study.creatorNickName}</span> <span style={{ marginTop: "2px" }}>{formatCreateTime(study.createdTime)}</span></div>
                                            <div><IoIosHeartEmpty /><span>{study.totalHeart}</span> <PiChatCircle style={{ strokeWidth: "20px" }} /><span>{study.totalComment}</span></div>
                                        </div>
                                    </div>
                                ))}
                                <div>
                                    <Pagination
                                        activePage={page}
                                        // 최소한 보여줄 아이템 개수
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