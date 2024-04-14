import React, { useEffect, useState, useRef } from 'react';
import http from '../../utils/http';
import { useLocation } from "react-router-dom";
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import "../../styles/ChatModal.css"
import { GoHome } from "react-icons/go";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { CiSquarePlus, CiChat2, CiUser } from "react-icons/ci";
import { isLocalhost } from "../../utils/DomainUrl";
import { Outlet } from "react-router";

const ChatModal = () => {
    const location = useLocation();
    const toUserId = new URLSearchParams(location.search).get("toUserId");
    const [connected, setConnected] = useState(false)
    const [receiveMessage, setReceiveMessage] = useState([])
    const stompClient = useRef({});
    const [currentUserId, setCurrentUserId] = useState('')
    const [currentRoomId, setCurrentRoomId] = useState('')  // 채팅방 선택했을때 roomId
    const [chatList, setChatList] = useState([])
    const [roomNick, setRoomNick] = useState('')
    const [roomProfileImg, setRoomProfileImg] = useState('')
    const [myInfo, setMyInfo] = useState('')


    const state = location.state && location.state?.backgroundLocation


    // 채팅방 ID 세팅 함수
    let fromPageRoomId = null;
    if (toUserId != undefined && currentUserId != null) {
        if (currentRoomId == '') {
            fromPageRoomId = myInfo + toUserId;
        } else {
            fromPageRoomId = currentRoomId
        }
    }

    // 채팅방 연결
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

    // 채팅방 가져오기
    const ChatList = async () => {
        const response = await http.get(`chat/chatList`)
        setMyInfo(response.data.myUser.id)
        setChatList(response.data.rooms.reverse())
    }
    useEffect(() => {
        ChatList()
    }, [receiveMessage, connected]) //etChatNoti,



    //  채팅방 선택 
    const selectRoom = (toUserId, roomId, nick, img) => {
        setRoomNick(nick);
        setRoomProfileImg(img);
        setCurrentUserId(toUserId);
        setCurrentRoomId(roomId);
        console.log(roomId);
        const url = `/ChatModal/chat/${myInfo}/m/${toUserId}`;
        window.history.pushState({}, '', url);
    }

    return (
        <div className='chatModal-container'>
            <div className='chatModal-nav'>
                <ul>
                    <h1 className='logo'>comfy</h1>
                    <li><GoHome id='GoHome' /></li>
                    <li><HiOutlineBellAlert id='HiOutlineBellAlert' /></li>

                    <li><CiSquarePlus /></li>

                    <li><CiChat2 /></li>

                    <li><CiUser /></li>
                </ul>
            </div>
            <div className='chatList-container'>
                <div id='userNickName'> 유저 닉네임</div>
                <h2>메세지</h2>
                <div className='chatList'>
                    {/* 채팅방 리스트 */}
                    {chatList.map(item => {
                        const uuidFilename = item.toUserImg
                        return (
                            <div
                                className="chat-tab"
                                onClick={() => selectRoom(item.toUserId, item.roomId, item.toUserNick, `${isLocalhost()}user/file/${uuidFilename}`)}
                                key={item.roomId}
                                state={{ backgroundLocation: state, roomId: item.roomId }}

                            >
                                <input type="text" className="userId" value={item.toUserId} hidden readOnly />
                                <input type="text" className="roomId" value={item.roomId} hidden readOnly />
                                <div className="profileImg">
                                    <img src={`${isLocalhost()}user/file/${uuidFilename}`} style={{ width: "50px", height: "50px", borderRadius: "50%" }} />
                                </div>
                                <div className="profileInfo">
                                    <div className="tab-nick">
                                        <h2>{item.toUserNick}</h2>
                                    </div>
                                    <div className="tab-last">{item.lastMsg}</div>
                                </div>
                                <div className="chat-noti">
                                    <div>
                                        {
                                            item.isRead ?
                                                <div></div>
                                                :
                                                <div className="noti-dot"></div>
                                        }
                                    </div>
                                </div>
                            </div>)
                    })}
                </div>
            </div>
            {/* 채팅 대화내역 띄우는 영역 */}
            <div className='chatLog-container'>
                <div className='chatLog'>
                    <Outlet context={{ receiveMessage, currentRoomId, myInfo, currentUserId, stompClient }} />
                </div>

            </div>

        </div>
    );
};

export default ChatModal;