"use client";
import styled, { keyframes } from "styled-components";

interface StyledMessageProps {
  sender: string;
}

// Animação para os pontos
const blink = keyframes`
  0%, 100% { opacity: 0; }
  50% { opacity: 1; }
`;

// Componente estilizado para o indicador de digitação
export const TypingIndicator = styled.div`
  display: inline-block;
  margin-left: 5px;
  font-size: 16px;
  line-height: 20px;

  span {
    animation: ${blink} 1.4s infinite;
    animation-fill-mode: both;
    padding: 0 2px;
  }

  span:nth-child(1) {
    animation-delay: 0s;
  }

  span:nth-child(2) {
    animation-delay: 0.2s;
  }

  span:nth-child(3) {
    animation-delay: 0.4s;
  }
`;

export const MessageBox = styled.div<StyledMessageProps>`
  background-color: ${(props) =>
    props.sender === "bot" ? "#e2e2e2" : "#efd319"};
  border-radius: 20px;
  padding: 10px 15px;
  margin: 30px 0;
`;

export const Container = styled.main`
  overflow-y: scroll;
  &::-webkit-scrollbar {
    background: #555;
  }
  &::-webkit-scrollbar-track {
    background: #eae6e6;
  }

  &::-webkit-scrollbar-thumb {
    background: #afacac;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;
export const ScrollableDiv = styled.div`
  flex: 1;
  margin-top: 5px;
`;
export const Message = styled.p`
  margin: 5px 0;
  color: #333;
  text-align: justify;
`;
