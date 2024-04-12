import React, { useEffect, useState, useRef } from 'react';
import http from '../../utils/http';
import { useLocation, NavLink } from "react-router-dom";
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import "../../styles/ChatModal.css"
import { GoHome } from "react-icons/go";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { CiSquarePlus, CiChat2, CiUser } from "react-icons/ci";

const ChatModal = () => {
    const [messageInput, setMessageInput] = useState('')
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
    const idx = location.pathname.lastIndexOf('/')
    const checkId = location.pathname.substring(idx + 1)



    //  유저 정보 get
    // useEffect(() => {

    //     // 유저 정보
    //     const fetchUserData = async () => {
    //         try {
    //             // 사용자 정보 가져오기
    //             const userInfoResponse = await http.get(`user/getUserInfo`);
    //             setCurrentUserId(userInfoResponse.data.userId);
    //         } catch (error) {
    //             console.error("Error fetching data:", error);
    //             // 에러 처리
    //         }
    //     };

    //     fetchUserData();
    // }, [])

    // 채팅방 ID 세팅 함수
    let fromPageRoomId = null;
    if (toUserId != undefined && currentUserId != null) {
        if (currentRoomId == '') {
            fromPageRoomId = currentUserId + toUserId;
        } else {
            fromPageRoomId = location.state.roomId;
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
    // 채팅방 가져오기
    const ChatList = async () => {
        const response = await http.get(`chat/chatList`)
        setMyInfo(response.data.myUser)
        setChatList(response.data.rooms.reverse())
        setCurrentUserId(response.data.myUser.id) // 로그인한 유저 id set
    }
    useEffect(() => {
        ChatList()
    }, [receiveMessage, connected]) //etChatNoti,


    const sendEnter = (e) => {
        if (e.key === 'Enter') {
            sendMessage()
        }
    }
    //  채팅방 선택 
    const selectRoom = (e) => {
        const toUserId = e.currentTarget.querySelector('.userId').value;
        const roomId = e.currentTarget.querySelector('.roomId').value;
        const nick = e.currentTarget.querySelector('.tab-nick h2').textContent;
        const img = e.currentTarget.querySelector('.profileImg img').src;
        // readNoti(roomId)
        setRoomNick(nick)
        setRoomProfileImg(img)
        setCurrentUserId(toUserId)
        setCurrentRoomId(roomId)
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
                            <NavLink to={`${currentUserId}/m/` + item.toUserId}
                                className="chat-tab"
                                onClick={selectRoom}
                                state={{ backgroundLocation: state, roomId: item.roomId }}
                                key={item.roomId}>
                                <input type="text" className="userId" value={item.toUserId} hidden readOnly />
                                <input type="text" className="roomId" value={item.roomId} hidden readOnly />
                                <div className="profileImg">
                                    <img src={`http://192.168.0.23:8080/user/file/${uuidFilename}`} style={{ width: "50px", height: "50px", borderRadius: "50%" }} />
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
                            </NavLink>)
                    })}
                </div>
            </div>

            <div className='chatLog-container'>
                <div className='chatLog'>

                </div>
                {/* 채팅방 입력 */}
                <div className="chatingInput-container">
                    <input type="text"
                        onChange={(e) => setMessageInput(e.target.value)}
                        value={messageInput}
                        placeholder="메시지 입력"
                        onKeyDown={sendEnter} />
                </div>
            </div>

        </div>
    );
};

export default ChatModal;