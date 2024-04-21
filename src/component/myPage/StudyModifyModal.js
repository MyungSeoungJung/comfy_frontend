import { useEffect, useRef, useState } from "react";
import http from "../../utils/http";
import { useNavigate } from "react-router-dom";
import "../../styles/StudyModify.css"
import RecruitStatusBtn from "../recruitStatusBtn/RecruitStatusBtn";
const StudyModifyModal = ({ onClose, studyId }) => {
    const titleRef = useRef();
    const contentRef = useRef();
    const [tags, setTags] = useState([]);
    const [study, setStudy] = useState({});
    const navigate = useNavigate();

    // 태그 삭제
    const removeTag = (tag) => {
        // 서버로부터 받은 스터디 정보를 업데이트하여 해당 태그를 제거
        const newTags = study.hashTags.filter((t) => t !== tag);
        setStudy({ ...study, hashTags: newTags });
    };


    useEffect(() => {
        const fetchData = async () => {
            const studyResponse = await http.get(`study/studyDetailPage?id=${studyId}`);
            setStudy(studyResponse.data)
        }
        fetchData();
    }, [])

    const addTag = (tag) => {
        // 태그가 이미 있는지 확인하고 없으면 추가
        if (!study.hashTags.includes(tag)) {
            // 새로운 스터디 정보를 만들어서 기존 정보를 복사한 후 hashTags를 업데이트
            const updatedStudy = { ...study, hashTags: [...study.hashTags, tag] };
            setStudy(updatedStudy);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const tag = e.target.value.trim();
            if (tag) {
                addTag(tag);
                e.target.value = "";
            }
        }
    };
    const modifyStudy = async (e) => {
        e.preventDefault();

    }

    return (
        <>
            <div className="studyModify-container">
                <div className="studyModify-wrapper">
                    <div className="studyModify-logo">
                        <div></div>
                    </div>
                    <div className="studyModify-content">
                        <div>
                            <RecruitStatusBtn recruitStatus={study.recruitStatus} />
                            <input ref={titleRef} id="titleInput" type="text" name="" placeholder="제목에 핵심 내용을 요약해보세요" value={study.title}
                                onChange={(e) => setStudy({ ...study, title: e.target.value })} />
                        </div>
                        <div><input id="tagInput" type="text" name="" placeholder="태그를 수정해보세요" onKeyDown={handleKeyDown} /></div>
                        <div><textarea ref={contentRef} name="" placeholder="컨텐트" cols="30" rows="10" value={study.content}
                            onChange={(e) => setStudy({ ...study, content: e.target.value })}></textarea></div>
                        <div id="tagArray">
                            {study.hashTags && study.hashTags.map((tag, index) => (
                                <p key={index}>
                                    <button onClick={() => removeTag(tag)}>x</button>
                                    <span>{tag}</span>
                                </p>
                            ))}
                        </div>
                        <div>
                            <button className="modal-close-button" onClick={onClose}>취소</button>
                            <button onClick={modifyStudy}>수정</button>


                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default StudyModifyModal;