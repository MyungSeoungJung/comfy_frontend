import React from "react";
import ChatBot from "react-simple-chatbot";
import "../../styles/Chatbot.css";

const steps = [
  //////////질문 카테고리 선택
  {
    id: "1",
    message: "안녕하세요! Comfy 도우미 챗봇이에요! 무엇을 도와드릴까요? ^_^",
    trigger: "2",
  },
  {
    id: "2",
    message: "제가 잘 알려드릴께요! 같이 스터디 찾아볼까요~~~",
    trigger: "3",
  },
  {
    id: "3",
    message: "먼저 다음 카테고리중 문의하고 싶은 내용을 선택해주세요~",
    trigger: "4",
  },
  {
    id: "4",
    options: [
      { value: "study", label: "스터디란?", trigger: "5" },
      { value: "inbody", label: "차차 수정", trigger: "6" },
      { value: "calendar", label: " 수정 2 ", trigger: "7" },
    ],
  },
  /////////넓은 범위 카테고리 선택 확인 메시지
  {
    id: "5",
    message: "스터디를 선택하셨어요! .",
    trigger: "8",
  },
  {
    id: "6",
    message: "인바디를 선택하셨습니다.",
    trigger: "9",
  },
  {
    id: "7",
    message: "캘린더를 선택하셨습니다.",
    trigger: "10",
  },
  ///////////////////// 세부 질문 카테고리 안내 메시지
  {
    id: "8",
    message:
      " 스터디 : (어떤 사람이 다른 사람과 특정한 내용을, 여러 사람이 특정한 내용을) 여럿이 모여 특정한 내용이나 분야를 공부하다",
    trigger: "11",
  },
  {
    id: "9",
    message: "인바디과 관련된 카테고리중 문의하고자 하는 내용을 선택해주세요~",
    trigger: "12",
  },
  {
    id: "10",
    message: "캘린더와 관련된 카테고리중 문의하고자 하는 내용을 선택해주세요~",
    trigger: "13",
  },
  /////////////////////////////////////////////////////////////////// 세부 질문 카테고리 선택
  {
    id: "11",
    options: [
      {
        value: "14",
        label: "스터디 모임을 찾고 싶은데 어떻게 하나요?",
        trigger: "14",
      },
      {
        value: "15",
        label: "제가 스터디를 주최하고 싶은데 어떻게 하나요?",
        trigger: "14",
      },
      {
        value: "16",
        label: "스터디 내역은 어디서 확인 가능한가요?",
        trigger: "14",
      },
    ],
  },
  {
    id: "12",
    options: [
      {
        value: "17",
        label: "인바디 전체 현황은 어디서 확인하나요?",
        trigger: "14",
      },
      {
        value: "18",
        label: "웹에서 사용자가 직접 물알람을 설정할 수 있나요?",
        trigger: "14",
      },
      {
        value: "19",
        label: "나의 인바디 정보를 다른 유저들과 서로 공유할 수 있나요?",
        trigger: "14",
      },
    ],
  },
  {
    id: "13",
    options: [
      {
        value: "20",
        label: "나의 헬스 캘린더는 어디서 확인할 수 있나요?",
        trigger: "24",
      },
      {
        value: "21",
        label: "사용자가 직접 캘린더에 일정 등록 및 삭제를 할 수 있나요?",
        trigger: "24",
      },
      {
        value: "22",
        label:
          "앱에 저장된 캘린더 일정들이 웹의 캘린더와 같이 연동되어 볼 수 있나요?",
        trigger: "24",
      },
    ],
  },
  /////////////////////////////////////////////////////////////////// 챌린지 답변
  {
    id: "14",
    message:
      "Comfy 메인페이지 보시면 스터디 리스트가 나와요! 최신순으로 상단에 정렬되어 있으니 자기자신에게 맞는 스터디를 찾길 바랄께요!",
    trigger: "24",
  },

  {
    id: "24",
    options: [
      { value: "more", label: "처음으로", trigger: "4" },
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

const CustomChatbot = ({ onClose }) => {
  return (
    <div className="chatbot-container">
      <button className="close-button" onClick={onClose}>
        X
      </button>
      <ChatBot steps={steps} />
    </div>
  );
};

export default CustomChatbot;
