import "../../../styles/StudyDetailPage.css";

const StudyDetailPage = () => {

    return (
        <>
            <div className="studyDetail-warpper">
                <div className="studyDetail-contain">
                    <div className="studyDetail-top" >
                        <h1> 제목</h1>
                        <p> 작성 시간</p>
                    </div>
                    <div className="study-item-horizontal"></div>
                    <div className="studyDetail-content" >
                        <p>컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠
                            컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠
                            컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐
                        </p>
                    </div>
                    <div className="study-item-horizontal"></div>

                    <div className="similar-study" >
                        <ul>
                            <li> 비슷한 컨텐츠 </li>
                        </ul>
                    </div>
                </div>
                <div className="studyDetail-side">
                    댓글
                </div>
            </div>
        </>
    )
}

export default StudyDetailPage;