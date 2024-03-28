import React, { useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

const ChatModal = () => {
    useEffect(() => {
        const socket = new SockJS("http://localhost:8080/ws");
        const stompClient = Stomp.over(socket);

        stompClient.connect({}, () => {
            console.log("WebSocket 연결이 열렸습니다.");
        });

        return () => {
            socket.close();
        };
    }, []);

    return (
        <div>
            <div className="container">
                <div className="col-6">
                    <label><b>채팅방</b></label>
                </div>
            </div>
        </div>
    );
};

export default ChatModal;