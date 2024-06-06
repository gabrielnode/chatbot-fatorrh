import { create } from "zustand";

interface ChatState {
  messages: string[];
  addMessage: (message: string) => void;
}

const useChatStore = create<ChatState>((set) => ({
  messages: [],
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
}));
export default useChatStore;
