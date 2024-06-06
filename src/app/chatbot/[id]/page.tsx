"use client";

import { default as ChatbotComponent } from "@/components/chatbot";
import GlobalStyle from "@/styles/global-style";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import ChatOptions from "@/components/options";
import { getOptionsForProfiles } from "@utils/profiles";
import { MessageInput, SendButton } from "@/components/message-input";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { postLogData } from "@/services/post-message";

const INITIAL_MESSAGE = {
  text: "Olá, como posso te ajudar?",
  sender: "bot",
  timestamp: new Date(),
  id: 1,
};

interface ChatbotProps {
  params: {
    id: string;
  };
}

interface Message {
  text: string;
  currentText?: string;
  sender: string;
  timestamp: Date;
  id: number;
}

interface Likes {
  id: number;
  flag: boolean;
  count: number;
}

interface Log {
  name: string;
  corporateName: string;
}

const Chatbot: React.FC<ChatbotProps> = ({ params }) => {
  const [activeChat, setActiveChat] = useState(false);
  const [selectedOptionId, setSelectedOptionId] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [isTyping, setIsTyping] = useState(false);
  const [botMessageId, setBotMessageId] = useState<number | null>(null);
  const perfil = decodeURIComponent(params.id);
  const perfis = perfil.split(",").map(decodeURIComponent);
  const hasRunOnce = useRef(false);
  const [log, setLog] = useState<Log>();
  const [likes, setLikes] = useState<Likes[]>([]);
  const [history, setHistory] = useState([]);
  const options = useMemo(() => getOptionsForProfiles(perfis), [perfis]);
  const lastMessageRef = useRef<string | null>(null);

  const { sendMessage, lastMessage, readyState } = useWebSocket(
    process.env.NEXT_PUBLIC_CHATBOT_API_URL_WS || "",
    {
      onOpen: () => console.log("Connected to WebSocket"),
      onClose: () => console.log("WebSocket connection closed"),
      onError: (error) => console.error("WebSocket Error:", error),
      shouldReconnect: () => true,
    }
  );

  useEffect(() => {
    if (lastMessage !== null && lastMessage.data !== lastMessageRef.current) {
      const message = lastMessage.data;
      lastMessageRef.current = message;

      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        const botMessageIndex = updatedMessages.findIndex(
          (msg) => msg.sender === "bot" && msg.id === botMessageId
        );

        if (botMessageIndex !== -1) {
          if (
            updatedMessages[botMessageIndex].currentText?.trim() !==
            message?.trim()
          ) {
            updatedMessages[botMessageIndex].text += ` ${message}`;
            updatedMessages[botMessageIndex].currentText = ` ${message}`;
          }
        } else {
          const newMessageId = new Date().getTime();
          updatedMessages.push({
            text: message,
            currentText: message,
            sender: "bot",
            timestamp: new Date(),
            id: newMessageId,
          });
          setBotMessageId(newMessageId);
        }

        return updatedMessages;
      });
      setIsTyping(false);
    }
  }, [lastMessage, botMessageId]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (
        event.origin !== process.env.NEXT_PUBLIC_GCPEC_LEGADO_URL &&
        event.origin !== process.env.NEXT_PUBLIC_GCPEC_URL
      ) {
        return;
      }

      const { type, payload } = event.data;
      if (type === "INITIAL_DATA") {
        setLog(payload);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  useEffect(() => {
    if (!hasRunOnce.current) {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
      }, 1000);
      hasRunOnce.current = true;
    }
  }, []);

  const handleSelectOption = useCallback((option: string) => {
    setSelectedOptionId(option);
    setActiveChat(true);
  }, []);

  const handleSendMessage = useCallback(async () => {
    const timestamp = new Date();
    if (inputValue.trim() !== "") {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: inputValue,
          sender: "user",
          timestamp,
          id: new Date().getTime(),
        },
      ]);

      const payload = {
        message: inputValue.trim(),
        profile: perfis[0],
        menu: selectedOptionId,
        history,
      };
      const logPayload = {
        name: log?.name,
        corporateName: log?.corporateName,
        date: timestamp,
        profile: perfis[0],
      };
      await postLogData(logPayload);

      setIsTyping(true);
      setInputValue("");

      if (readyState === ReadyState.OPEN) {
        sendMessage(JSON.stringify(payload));
        setBotMessageId(null);
      } else {
        console.error("WebSocket is not open");
      }
    }
  }, [
    inputValue,
    perfis,
    selectedOptionId,
    history,
    log,
    readyState,
    sendMessage,
  ]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Enter") {
        event.preventDefault();
        handleSendMessage();
      }
    },
    [handleSendMessage]
  );

  const handleLike = useCallback((id: number) => {
    setLikes((prevLikes) => {
      const updatedLikes = [...prevLikes];
      const messageIndex = updatedLikes.findIndex((like) => like.id === id);
      if (messageIndex !== -1) {
        updatedLikes[messageIndex].flag = true;
      } else {
        updatedLikes.push({ id, flag: true, count: 1 });
      }
      return updatedLikes;
    });
  }, []);

  const handleDislike = useCallback((id: number) => {
    setLikes((prevLikes) => {
      const updatedLikes = [...prevLikes];
      const messageIndex = updatedLikes.findIndex((like) => like.id === id);
      if (messageIndex !== -1) {
        updatedLikes[messageIndex].flag = false;
      } else {
        updatedLikes.push({ id, flag: false, count: -1 });
      }
      return updatedLikes;
    });
    setMessages((prevMessage) => [
      ...prevMessage,
      {
        text: "Se persistir a dúvida, entre em contato conosco pelos telefones: (11) 3864.1200 / 3864.8161 ou abra um chamado pelo ícone Suporte.",
        sender: "bot",
        timestamp: new Date(),
        id: new Date().getTime(),
      },
    ]);
  }, []);

  return (
    <div style={{ alignContent: "center", flex: 1, overflowY: "hidden" }}>
      <GlobalStyle />
      {!activeChat ? (
        <ChatOptions onSelectOption={handleSelectOption} options={options} />
      ) : (
        <>
          <ChatbotComponent
            perfil={perfil}
            selectedOptionId={selectedOptionId}
            messages={messages}
            isTyping={isTyping}
            likes={likes}
            onLike={handleLike}
            onDislike={handleDislike}
          />
          <div
            style={{
              padding: "10px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: "white",
              boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <MessageInput
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Escreva uma mensagem..."
            />
            <SendButton onClick={handleSendMessage}>Enviar</SendButton>
          </div>
        </>
      )}
    </div>
  );
};

export default Chatbot;
