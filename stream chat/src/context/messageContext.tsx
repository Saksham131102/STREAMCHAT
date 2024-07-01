import { createContext, useContext, useEffect, useState } from "react";

interface IMessage {
  _id: string;
  message: string;
  sender: string;
  profilePic: string;
  room: string;
  time: string;
}

interface MessageContextType {
  messages: IMessage[];
  setMessages: React.Dispatch<React.SetStateAction<IMessage[]>>;
}

const INITIAL_STATE = {
  messages: [],
  setMessages: () => {},
};

const MessageContext = createContext<MessageContextType>(INITIAL_STATE);

const MessageContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // const [messages, setMessages] = useState<IMessage[]>(INITIAL_STATE.messages);
  const [messages, setMessages] = useState<IMessage[]>(() => {
    // Load initial messages from localStorage if available
    const savedMessages = localStorage.getItem("messages");
    return savedMessages ? JSON.parse(savedMessages) : INITIAL_STATE.messages;
  });

  useEffect(() => {
    // Save messages to localStorage whenever they change
    localStorage.setItem("messages", JSON.stringify(messages));
    // if messages are empty, remove them from localStorage
    if (messages.length === 0) {
      localStorage.removeItem("messages");
    }
  }, [messages]);

  return (
    <MessageContext.Provider value={{ messages, setMessages }}>
      {children}
    </MessageContext.Provider>
  );
};

export default MessageContextProvider;

export const useMessageContext = () => {
  return useContext(MessageContext);
};
