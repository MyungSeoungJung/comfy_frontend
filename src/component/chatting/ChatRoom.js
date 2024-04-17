import http from "../../utils/http"
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useOutletContext } from "react-router";
import moment from "moment";
import "../../styles/ChatRoom.css"
import { isLocalhost } from "../../utils/DomainUrl";


const ChatRoom = () => {
    const { receiveMessage, currentRoomId, myInfo, currentUserId, stompClient, setCurrentUserId, setCurrentRoomId } = useOutletContext()
    const location = useLocation()
    const [messageInput, setMessageInput] = useState('')
    const [chatLog, setChatLog] = useState([])
    const { state } = location;
    const { toUserId, roomId, toUserImg } = state || {};

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
            // message: null,
            // lastMsgTime: null,
            // nickName: null,
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
        // 비동기 처리할 메세지 객체 형태
        let formatMessage = {
            userid: myInfo,
            toUserId: currentUserId,
            roomId: parseInt(currentRoomId),
            content: messageInput,
            createdAt: moment().unix()
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
    // 시간 표시 함수
    const displayTime = (timestamp, index) => {
        if (index === 0) {
            // 첫 번째 메시지인 경우 항상 표시
            const messageTime = moment.unix(timestamp);
            const formattedTime = messageTime.format('a h:mm');
            return formattedTime.replace('am', '오전').replace('pm', '오후');
        } else if (index > 0 && chatLog[index - 1]) { // 이전 메시지가 존재하는 경우에만 시간 비교
            const prevMessageTime = moment.unix(chatLog[index - 1].createdAt);
            const messageTime = moment.unix(timestamp);
            const diffMinutes = messageTime.diff(prevMessageTime, 'minutes');
            if (diffMinutes >= 1) {
                const formattedTime = messageTime.format('a h:mm');
                return formattedTime.replace('am', '오전').replace('pm', '오후');
            }
        }
        return '';
    };


    return (
        <div className="logList">

            <div className="logList">
                {chatLog.map((item, index) => {
                    const uuidFilename = item.profileImg;
                    return (
                        item.userid === myInfo ? (
                            <div key={item.id} className={item.userid === myInfo ? 'myMsg' : 'anotherMsg'}>
                                {/* 채팅방 안에 메세지 박스 */}
                                <div className="msg-box">
                                    {item.userid !== myInfo && (
                                        <div className="profileImg">
                                            <div className="time">{displayTime(item.createdAt, index)}</div>
                                        </div>
                                    )}
                                    <div className="msg">
                                        <div>{item.content}</div>
                                    </div>
                                    <div className="time">{displayTime(item.createdAt, index)}</div>
                                </div>
                            </div>
                        ) : (
                            //  상대방 유저 대화 div
                            <div key={item.id} className="anotherMsg">
                                <div className="msg-wrap">
                                    <div className="msg-box">
                                        <div className="profileImg">
                                            <img src={`${isLocalhost()}user/file/${uuidFilename}`} alt="" />
                                        </div>
                                        <div className="msg">
                                            <div>{item.content}</div>
                                        </div>
                                    </div>
                                    <div className="time">{displayTime(item.createdAt, index)}</div>
                                </div>
                            </div>
                        )
                    );
                })}
            </div>

            {/* 채팅방 입력 */}
            <div className="chatingInput-container">
                <input
                    type="text"
                    onChange={(e) => setMessageInput(e.target.value)}
                    value={messageInput}
                    placeholder="메시지 입력"
                    onKeyDown={sendEnter}
                />
            </div>
        </div>
    );
};




export default ChatRoom;