import React from "react";
import { OptionsContainer, OptionButton } from "../app/chatbot/styles";

interface ChatOptionsProps {
  onSelectOption: (option: string) => void;
  options: string[];
}

const ChatOptions = ({ onSelectOption, options }: ChatOptionsProps) => {
  return (
    <OptionsContainer>
      <div
        style={{
          margin: 12,
          marginBottom: 58,
          color: "#959595",
        }}
      >
        Bem-vindo ao nosso chatbot de suporte! Sou um assistente virtual
        projetado para ajudá-lo a encontrar respostas rápidas e soluções para
        suas dúvidas sobre os processos da nossa empresa. Fique à vontade para
        me fazer perguntas e explorar as informações disponíveis.
      </div>
      {options.map((option: string, index: number) => (
        <OptionButton key={index} onClick={() => onSelectOption(option)}>
          {option}
        </OptionButton>
      ))}
    </OptionsContainer>
  );
};

export default ChatOptions;
