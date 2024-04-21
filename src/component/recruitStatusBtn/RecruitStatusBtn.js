import "./RecruitStatusBtn.css"
const RecruitStatusBtn = (recruitStatus) => {
    return (
        <div id="RecruitStatusBtn">
            {
                recruitStatus ? (
                    <button> 모집중</button >
                ) : (
                    <button>모집 완료</button>
                )
            }
        </div>
    )

}

export default RecruitStatusBtn;