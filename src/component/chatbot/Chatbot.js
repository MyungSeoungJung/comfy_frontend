import React from "react";
import ChatBot from "react-simple-chatbot";
import "../../styles/Chatbot.css";
import { ThemeProvider } from 'styled-components';

const steps = [
  //////////질문 카테고리 선택
  {
    id: "1",
    message: "안녕하세요 COMFY입니다! 오늘도 COMFY를 이용해주셔서 감사해요. 문의할 서비스 유형을 선택해주시면 자세히 안내 드릴게요!",
    trigger: "2",
  },
  {
    id: "2",
    options: [
      { value: "study", label: "자주 묻는 질문", trigger: "3" },
      { value: "inbody", label: "스터디 만들기", trigger: "4" },
      { value: "calendar", label: "계정", trigger: "5" },
    ],
  },
  /////////넓은 범위 카테고리 선택 확인 메시지
  {
    id: "3",
    message: "이용자들이 자주 묻는 질문들을 모아봤어요. 고객님이 궁금한 정보를 대기 없이 빠르게 찾을 수 있을 거예요!",
    trigger: "8",
  },
  {
    id: "4",
    message: "스터디를 만드는 이용방법이나 자신이 작성한 게시물에대해 궁금증이 있나요?",
    trigger: "9",
  },
  {
    id: "5",
    message: "로그인이나 계정에 문제가 있나요?",
    trigger: "10",
  },
  ///// 자주 묻는 질문 바로 대답
  {
    id: "8",
    message:
      "자주 묻는 질문 이미지",
    trigger: "24",
  },
  //  질문 카테고리
  {
    id: "9",
    options: [
      {
        value: "17",
        label: "스터디는 어떻게 만들어야되나요?",
        trigger: "14",
      },
      {
        value: "18",
        label: "태그는 어떻게 활용해야하나요?",
        trigger: "14",
      },
      {
        value: "19",
        label: "스터디 모집 상태를 변경하려면 어떻게 해야하나요?",
        trigger: "14",
      },
      {
        value: "19",
        label: "제가 작성한 글이나 댓글을 삭제하려면 어떻게 해야하나요?",
        trigger: "14",
      },
    ],
  },
  {
    id: "10",
    options: [
      {
        value: "20",
        label: "프로필 사진을 변경하거나 계정 정보 수정할 수 있나요?",
        trigger: "24",
      },
      {
        value: "21",
        label: "아이디가 기억이나지 않아요",
        trigger: "24",
      },
      {
        value: "22",
        label:
          "비밀번호를 분실했어요.",
        trigger: "24",
      },
    ],
  },
  /////////////질문 대답 리스트
  {
    id: "14",
    message:
      "이에 대한 답변은 아직 개발중에 있습니다",
    trigger: "24",
  },

  {
    id: "24",
    options: [
      { value: "more", label: "처음으로", trigger: "2" },
      { value: "end", label: "종료하기", trigger: "25" },
    ],
  },
  {
    id: "25",
    message:
      "이용을 완료하셨습니다! 감사합니다 좋은 스터디 되세요! (종료버튼 우측상단)",
    end: true,
  },
];
const theme = {
  background: '#f5f8fb',
  fontFamily: 'Helvetica Neue',
  headerBgColor: '#00c471',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#00c471;',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
};

const CustomChatbot = ({ onClose }) => {
  return (
    <div className="chatbot-container">
      <button className="close-button" onClick={onClose}>
        X
      </button>
      <ThemeProvider theme={theme}>
        <ChatBot steps={steps} />
      </ThemeProvider>
    </div>
  );
};

export default CustomChatbot;
