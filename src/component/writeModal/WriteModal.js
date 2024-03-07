import "../../styles/WriteModal.css"
const WriteModal = ({ onClose }) => {

    return (
        <>
            <div className="modal-container">
                <div className="modal-wrapper">
                    <button className="modal-close-button" onClick={onClose}>x</button>
                    <div className="write-modal-category">
                        <p>질문</p><p>스터디</p><p>고민있어요</p>
                    </div>
                    <div className="write-modal-content">
                        <div><input type="text" name="" placeholder="제목에 핵심 내용을 요약해보세요" /></div>
                        <div><input type="text" name="" placeholder="태그를 설정하세요 (최대 5개)" /></div>
                        <div><textarea name="" placeholder="df" cols="30" rows="10"></textarea></div>
                    </div>
                </div>
            </div >
        </>
    );
};
export default WriteModal;