import http from "../../utils/http"
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useOutletContext } from "react-router";
import moment from "moment";


const ChatRoom = () => {
    const { receiveMessage, currentRoomId, myInfo, currentUserId, stompClient } = useOutletContext()
    const location = useLocation()
    const [messageInput, setMessageInput] = useState('')
    const [chatLog, setChatLog] = useState([])
    const idx = location.pathname.lastIndexOf('/')
    const checkId = location.pathname.substring(idx + 1)

    const messageLog = async () => {
        const chatRequestDto = {
            myId: myInfo,
            toUserId: currentUserId,
            roomId: currentRoomId,
            message: null,
            lastMsgTime: null,
            nickName: null,
        };
        if (currentRoomId != null) {
            const response = await http.post("chat/getChatLog", chatRequestDto)
            setChatLog(response.data.messages.reverse())
        }
    }


    // 메세지 전송
    const sendMessage = () => {
        // 유저페이지에서 메시지 보내기로 왔을때
        if (currentUserId == checkId) {

            const newMessage = {
                myId: myInfo,
                toUserId: currentUserId,
                roomId: parseInt(currentRoomId),
                message: messageInput
            }
            console.log(newMessage);
            stompClient.current.publish({
                destination: `/pub/chat/m`, body: JSON.stringify({
                    newMessage
                })
            });
            setMessageInput('')
        }

        stompClient.current.publish({
            destination: `/pub/chat/m`, body: JSON.stringify({
                message
            })
        });
        setMessageInput('')
    };
    useEffect(() => {
        messageLog()

    }, [receiveMessage, messageInput])
    //   전송할 메세지
    let message = {
        myId: myInfo,
        toUserId: currentUserId,
        roomId: currentRoomId,
        message: messageInput
    }
    const sendEnter = (e) => {
        if (e.key === 'Enter') {
            sendMessage()
        }
    }
    return (
        <div className="logList">
            {chatLog.map((item) => (
                item.userid === myInfo ? (
                    <div className="myMsg" key={item.id}>
                        <div className="msg-box">
                            <div className="msg"><div>{item.content}</div></div>
                            <div className="time">{moment(item.createdAt).calendar()}</div>
                        </div>
                    </div>
                ) : (
                    <div key={item.id} className="anotherMsg">
                        <div className="msg-wrap">
                            <div className="msg-box">
                                <div className="profileImg">
                                    <img src={`${process.env.REACT_APP_IMAGE_PATH}${item.profileImg}`} alt="" />
                                </div>
                                <div className="msg">
                                    <div>{item.content}</div>
                                </div>
                            </div>
                            <div className="time">{moment(item.createdAt).calendar()}</div>
                        </div>
                    </div>
                )
            )
            )}
            {/* 채팅방 입력 */}
            <div className="chatingInput-container">
                <input type="text"
                    onChange={(e) => setMessageInput(e.target.value)}
                    value={messageInput}
                    placeholder="메시지 입력"
                    onKeyDown={sendEnter} />
            </div>
        </div>
    );
}


export default ChatRoom;