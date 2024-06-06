"use client";

import useChatStore from "@/store/use-chat-store";
import { useState } from "react";
import styled from "styled-components";
const InputArea = styled.div`
  display: flex;
  padding: 10px 0;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px 15px;
  background: blue;
  color: white;
  border: none;
  border-radius: 5px;
  margin-left: 10px;
  cursor: pointer;
`;

const ChatInput: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const addMessage = useChatStore((state) => state.addMessage);

  const handleSendMessage = () => {
    if (message.trim()) {
      addMessage(message);
      setMessage("");
    }
  };

  return (
    <InputArea>
      <Input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <Button onClick={handleSendMessage}>Send</Button>
    </InputArea>
  );
};
export default ChatInput;
