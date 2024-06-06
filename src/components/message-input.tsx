"use client";
import styled from "styled-components";

export const MessageInput = styled.input`
  border-radius: 20px;
  border: none;
  padding: 10px 15px;
  width: calc(100% - 30px);
  margin: 10px 0;
  background-color: #fff;
  color: #333;
  &::placeholder {
    color: #888;
  }
`;

export const SendButton = styled.button`
  background-color: #efd319;
  color: #555;
  border: none;
  border-radius: 20px;
  margin-left: 10px;
  height: 40px;
  width: 60px;
  cursor: pointer;
  &:hover {
    background-color: #efd319;
  }
`;
