import React, { useState, useEffect } from "react";
import "../../styles/CreateStudyGroup.css";
import WriteModal from "../writeModal/WriteModal";
import http from "../../utils/http";

// const study = {
//     id: null,
//     title: "",
//     content: "",
//     recruitStatus: "",
//     creatorNickName: "",
//     creatorId: null,
//     createdTime: ""
// };

const CreateStudyGruop = () => {
  const [writeModalHandle, setWriteModalHandle] = useState(false);
  const [study, setStudy] = useState([]);

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
      setStudy(response.data);
    };
    fetchData();
  }, []);

  return (
    <>
      {/* 메인 */}
      <div className="create-study-body">
        {/* 검색 상단 */}
        <div className="create-study-center">
          <div className="create-study-banner">sd</div>
          <div className="create-study-contain">
            <div className="create-study-state">
              <button>전체</button>
              <button>모집중</button>
              <button>모집 완료</button>
            </div>

            {/* 검색창 */}
            <div className="create-study-search">
              <div>
                <input type="text" placeholder="스터디를 검색하세요" />{" "}
                <button>검색</button>
              </div>
              <div>
                {" "}
                <input type="text" placeholder="태그로 검색하세요" />{" "}
                <button>초기화</button>{" "}
              </div>
            </div>
            {/* 검색창 */}

            {/* 게시글 부분 */}
            <div className="create-study-content">
              <div className="create-study-content-top">
                <div>
                  <p>최신순</p>
                  <p>좋아요순</p>
                </div>
                <div>
                  {" "}
                  <button onClick={openWriteModal}>글쓰기</button>
                </div>
              </div>
              {/* 게시글 부분 */}

              {/* 컨텐츠 영역*/}
              <div className="create-study-content-main">메인</div>
              {/* 컨텐츠 영역*/}
            </div>
            {/* 게시글 부분 */}
          </div>
        </div>
        {/* side 인기태그 */}
        <aside className="create-study-side">
          <p>인기 태그</p>
        </aside>
        {/* side 인기태그 */}
        {writeModalHandle && (
          <WriteModal isOpen={openWriteModal} onClose={closeWriteModal} />
        )}
      </div>
      {/* 메인 */}
    </>
  );
};

export default CreateStudyGruop;
