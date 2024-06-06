"use client";

import styled from "styled-components";

interface MessageProps {
  sender: string;
}

export const ChatContainer = styled.div`
  font-family: Arial, sans-serif;
  background-color: white;
  width: 350px;
  height: 600px;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

export const Message = styled.div<MessageProps>`
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 10px;
  margin: 5px 0;
  position: relative;
  align-self: ${(props) =>
    props.sender === "bot" ? "flex-start" : "flex-end"};
`;

export const TimeStamp = styled.span`
  position: absolute;
  bottom: -10px;
  right: 10px;
  font-size: 10px;
  color: #666;
`;

export const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 50px;
`;

export const OptionButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px;
  margin: 5px 0;
  border-radius: 20px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #357abd;
  }
`;

export const InputContainer = styled.div`
  margin-top: auto;
  display: flex;
  align-items: center;
`;

export const InputText = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 20px;
  margin-right: 5px;
`;

export const SendButton = styled.button`
  background-color: #efd319;
  border: none;
  color: #555;
  padding: 10px 20px;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    background-color: #efd319;
  }
`;
