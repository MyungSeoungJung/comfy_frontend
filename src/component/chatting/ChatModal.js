import React, { useEffect, useState, useRef } from 'react';
import http from '../../utils/http';
import { useLocation } from "react-router-dom";
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

// const chatRequest = {
//     myId: 1,
//     toUserId: 2,
//     roomId: 12345,
//     message: "Hello, how are you?"
// };

const ChatModal = () => {
    const [messageInput, setMessageInput] = useState('')
    const location = useLocation();
    const toUserId = new URLSearchParams(location.search).get("toUserId");
    const [connected, setConnected] = useState(false)
    const [receiveMessage, setReceiveMessage] = useState([])
    const stompClient = useRef({});
    const [currentUserId, setCurrentUserId] = useState('')
    const [currentRoomId, setCurrentRoomId] = useState('')  // 채팅방 선택했을때 roomId
    const state = location.state && location.state?.backgroundLocation
    const idx = location.pathname.lastIndexOf('/')
    const checkId = toUserId
    //  유저 정보 get
    useEffect(() => {

        // 유저 정보
        const fetchUserData = async () => {
            try {
                // 사용자 정보 가져오기
                const userInfoResponse = await http.get(`user/getUserInfo`);
                setCurrentUserId(userInfoResponse.data.userId);
            } catch (error) {
                console.error("Error fetching data:", error);
                // 에러 처리
            }
        };

        fetchUserData();
    }, [])

    let fromPageRoomId = null;
    if (toUserId != undefined && currentUserId != null) {
        if (currentRoomId == '') {
            fromPageRoomId = currentUserId + toUserId;
        } else {
            // fromPageRoomId = location.state.roomId;
            fromPageRoomId = 124;
        }
    }

    useEffect(() => {
        const socket = new SockJS("http://localhost:8080/ws");
        stompClient.current = Stomp.over(socket);

        stompClient.current.connect({}, () => {
            console.log("WebSocket 연결이 열렸습니다.");
            setConnected(true)

            // 해당 채팅방 구독
            stompClient.current.subscribe(
                `/sub/chat/m/${fromPageRoomId != null && currentRoomId == '' ?
                    fromPageRoomId : currentRoomId}`,
                (frame) => {
                    let msg = JSON.parse(frame.body)
                    console.log(msg);
                    setReceiveMessage(msg)
                },
                {},
            );
        });
        return () => {
            stompClient.current.disconnect()
            setConnected(false)
        }
    }, [location.pathname])


    // 메세지 전송
    const sendMessage = () => {
        // 유저페이지에서 메시지 보내기로 왔을때
        if (toUserId == checkId) {

            const newMessage = {
                myId: currentUserId,
                toUserId: toUserId,
                roomId: parseInt(fromPageRoomId),
                message: messageInput
            }
            console.log("채팅방 Id---------------" + fromPageRoomId);

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
    //   전송할 메세지
    let message = {
        myId: currentUserId,
        toUserId: toUserId,
        roomId: fromPageRoomId,
        message: messageInput
    }

    const sendEnter = (e) => {
        if (e.key === 'Enter') {
            sendMessage()
        }
    }


    return (
        <div>
            <div className="chatModal-container">
                <div className="chatModal-wrapper">
                    <h1>toUserId</h1>
                    <ul>메세지</ul>
                    <input type="text"
                        onChange={(e) => setMessageInput(e.target.value)}
                        value={messageInput}
                        placeholder="메시지 입력"
                        onKeyDown={sendEnter}
                    />                </div>
            </div>
        </div>
    );
};

export default ChatModal;