import React, { useState } from "react";
import "../../styles/CreateStudyGroup.css"
import WriteModal from "../writeModal/WriteModal";



const CreateStudyGruop = () => {
    const [writeModalHandle, setWriteModalHandle] = useState(false);

    const WriteModalOpen = () => {
        setWriteModalHandle(true);
    }
    return (
        <>
            {/* 메인 */}
            <div className="create-study-body">

                {/* 검색 상단 */}
                <div className="create-study-center">
                    <div className="create-study-state">
                        <div><p>전체</p></div>
                        <div><p>모집중</p></div>
                        <div><p>모집완료</p></div>
                    </div>

                    {/* 검색창 */}
                    <div className="create-study-search">
                        <div><input type="text" placeholder="스터디를 검색하세요" /> <button>검색</button></div>
                        <div> <input type="text" placeholder="태그로 검색하세요" /> <button>초기화</button> </div>
                    </div>
                    {/* 검색창 */}

                    {/* 게시글 부분 */}
                    <div className="create-study-content">
                        <div className="create-study-content-top">
                            <div><p>최신순</p><p>좋아요순</p></div>
                            <div> <button onClick={WriteModalOpen}>글쓰기</button></div>
                        </div>
                        {/* 게시글 부분 */}


                        {/* 컨텐츠 영역*/}
                        <div className="create-study-content-main">
                            메인
                        </div>
                        {/* 컨텐츠 영역*/}

                    </div>
                </div>
                {/* 검색 상단 */}

                {/* side 인기태그 */}
                <aside className="create-study-side">
                    <p>인기 태그</p>
                </aside>
                {/* side 인기태그 */}
                {writeModalHandle && (<WriteModal></WriteModal>)}
            </div>
            {/* 메인 */}
        </>
    );
}

export default CreateStudyGruop;