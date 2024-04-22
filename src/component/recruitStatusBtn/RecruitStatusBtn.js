import React from "react";
import "./RecruitStatusBtn.css";

const RecruitStatusBtn = ({ recruitStatus, onClick }) => {
    return (
        <div className="RecruitStatusBtn">
            {recruitStatus === "모집중" ? (
                <button onClick={onClick} id="RecruitingBtn">모집중</button>
            ) : (
                <button onClick={onClick} id="RecruitCompleteBtn">모집 완료</button>
            )}
        </div>
    );
}

export default RecruitStatusBtn;
