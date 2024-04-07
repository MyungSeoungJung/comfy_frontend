import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/WriteModal.css";
import http from "../../utils/http";

const WriteModal = ({ onClose }) => {
    const titleRef = useRef();
    const contentRef = useRef();
    const [tags, setTags] = useState([]);
    const navigate = useNavigate();


    const addTag = (tag) => {
        if (!tags.includes(tag)) {
            setTags([...tags, tag]);
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

    // 태그 삭제
    const removeTag = (tag) => {
        // 배열에서 해당 태그를 필터링하여 제거
        const newTags = tags.filter((t) => t !== tag);
        setTags(newTags);
    };

    const addStudy = async (e) => {
        e.preventDefault();

        const data = {
            title: titleRef.current.value,
            content: contentRef.current.value,
            tagNames: tags.length > 0 ? tags : [],
        }
        const response = await http.post("study/addStudy", data);

        console.log("생성된 스터디 ID" + response.data);
        const url = `/study/studyDetailPage?id=${response.data}`;
        // 생성된 URL로 페이지를 이동
        navigate(url);
    }


    return (
        <>
            <div className="modal-container">
                <div className="modal-wrapper">
                    <div className="write-modal-category">
                        <p>질문</p><p>스터디</p><p>고민있어요</p>
                    </div>
                    <div className="write-modal-content">
                        <div><input ref={titleRef} id="titleInput" type="text" name="" placeholder="제목에 핵심 내용을 요약해보세요" /></div>
                        <div><input id="tagInput" type="text" name="" placeholder="Enter로 태그를 추가해보세요" onKeyDown={handleKeyDown} /></div>
                        <div id="tagArray">
                            {tags.map((tag, index) => (
                                <p key={index}>
                                    <button onClick={() => removeTag(tag)}>x</button>
                                    <span>{tag}</span>
                                </p>
                            ))}
                        </div>
                        <div><textarea ref={contentRef} name="" placeholder="컨텐트" cols="30" rows="10"></textarea></div>
                        <div>
                            <button className="modal-close-button" onClick={onClose}>취소</button> <button onClick={addStudy}>등록</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default WriteModal;
