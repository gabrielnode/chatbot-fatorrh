"use client";
import useChatStore from "@/store/use-chat-store";
import styled from "styled-components";

const Messages = styled.div`
  max-height: 300px;
  overflow-y: auto;
`;

const Message = styled.div`
  background: #e0e0e0;
  padding: 10px;
  margin: 10px 0;
  border-radius: 10px;
`;

const MessageList: React.FC = () => {
  const messages = useChatStore((state) => state.messages);

  return (
    <Messages>
      {messages.map((msg, index) => (
        <Message key={index}>{msg}</Message>
      ))}
    </Messages>
  );
};

export default MessageList;
