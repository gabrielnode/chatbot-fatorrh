"use client";

import {
  Container,
  Message,
  MessageBox,
  ScrollableDiv,
  TypingIndicator,
} from "@/components/message-box";
import { memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { DislikeButton, LikeButton } from "@components/like-dislike";

interface Likes {
  id: number;
  flag: boolean;
  count: number;
}
interface ChatbotProps {
  perfil: string;
  selectedOptionId: string;
  messages: any[];
  likes: Likes[];
  isTyping: boolean;
  onLike: (id: number) => void;
  onDislike: (id: number) => void;
}

interface MessageItem {
  sender: string;
  text: string;
  timestamp: Date;
}

const Chatbot: React.FC<ChatbotProps> = ({
  messages,
  isTyping,
  likes,
  onLike,
  onDislike,
}) => {
  const formatDate = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div style={{ borderRadius: 5 }}>
      <header
        style={{
          backgroundColor: "#007BFF",
          padding: "10px 20px",
          color: "white",
          fontSize: "18px",
          fontWeight: "bold",
          textAlign: "left",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
        }}
      >
        CHATBOT GCPEC
      </header>
      <Container
        style={{
          padding: "20px",
          paddingBottom: "80px",
          display: "flex",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        <ScrollableDiv>
          {messages?.map((msg: MessageItem, index: number) => {
            const findLike = likes?.findIndex((like) => like.id === index);
            const flagLike = findLike !== -1 ? true : false;

            return (
              <MessageBox key={index} sender={msg.sender}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  {msg.sender === "bot" ? (
                    <FontAwesomeIcon
                      icon={faRobot}
                      style={{ marginRight: 15 }}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faUser}
                      style={{ marginRight: 15 }}
                    />
                  )}
                  <div>
                    <Message>{msg.text}</Message>
                    <div style={{ fontSize: "0.8em", opacity: 0.8 }}>
                      {formatDate(msg.timestamp)}
                    </div>
                  </div>
                </div>
                {msg.sender === "bot" && (
                  <div>
                    <LikeButton
                      disabled={flagLike}
                      onClick={() => onLike(index)}
                    >
                      👍
                    </LikeButton>
                    <DislikeButton
                      disabled={flagLike}
                      onClick={() => onDislike(index)}
                    >
                      👎
                    </DislikeButton>
                  </div>
                )}
              </MessageBox>
            );
          })}
          {isTyping && (
            <TypingIndicator>
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </TypingIndicator>
          )}
        </ScrollableDiv>
      </Container>
    </div>
  );
};
export default memo(Chatbot);
