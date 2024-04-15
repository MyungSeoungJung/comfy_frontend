import http from "../../utils/http"
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useOutletContext } from "react-router";
import moment from "moment";


const ChatRoom = () => {
    const { receiveMessage, currentRoomId, myInfo, currentUserId, stompClient, setCurrentUserId, setCurrentRoomId } = useOutletContext()
    const location = useLocation()
    const [messageInput, setMessageInput] = useState('')
    const [chatLog, setChatLog] = useState([])
    const { state } = location;
    const { toUserId, roomId } = state || {};

    // 스터디 디테일 페이지에서 넘어올때 roomId toUserId값 초기화
    useEffect(() => {
        if (roomId && toUserId) {
            setCurrentUserId(toUserId);
            setCurrentRoomId(roomId);
        }
    }, [roomId, toUserId, setCurrentUserId, setCurrentRoomId,]);

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
        //채팅리스트에서 클릭해서 왔을때

        let newMessage = {
            myId: myInfo,
            toUserId: currentUserId,
            roomId: parseInt(currentRoomId),
            message: messageInput
        };
        console.log(newMessage);
        stompClient.current.publish({
            destination: `/pub/chat/m`, body: JSON.stringify({
                newMessage
            })
        });
        let formatMessage = {
            myId: myInfo,
            toUserId: currentUserId,
            roomId: parseInt(currentRoomId),
            content: messageInput
        };
        setChatLog(prevChatLog => [...prevChatLog, formatMessage]);
        setMessageInput('')
    };

    // 메시지 내역 useEffect
    useEffect(() => {
        messageLog()
    }, [receiveMessage, currentRoomId])

    // 엔터키 이벤트
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