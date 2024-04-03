import "../../styles/MyPage.css"
const MyPage = () => {

    return (
        <>
            <div className="myPage-contain">
                <div className="myPage-banner">
                    계정 정보
                </div>
                <form action="" className="myPage-content">

                    <div className="myPage-profile-img-contain">
                        <h1>프로필 이미지</h1>
                        <div className="profile-img">
                            <img src="" alt="" id="preview-img" />
                            <div>
                                <label htmlFor="file">
                                    <div className="profile-change">변경</div>
                                    <input type="file" name="file" id="file" />
                                </label>
                                <p>확장자: png, jpg, jpeg / 용량: 1MB 이하 </p>
                            </div>
                        </div>
                    </div>

                    <div className="myPage-bottom">
                        <h1>닉네임</h1>
                        <p>한글, 영문(대소문자), 숫자 조합 / 2~18자 이하</p>
                        <input type="text" />

                        <h1>자기 소개</h1>
                        <textarea name="" id="" cols="30" rows="10"></textarea>
                    </div>
                    <button> 저장하기 </button>
                </form>
            </div>

        </>
    )
}

export default MyPage