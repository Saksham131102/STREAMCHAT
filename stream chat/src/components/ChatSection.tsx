import { useMessageContext } from "@/context/messageContext";
import { useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Message from "./Message";

// import useGetMessages from "@/hooks/useGetMessages";

const ChatSection = () => {
  const { messages } = useMessageContext();
  const lastMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);
  return (
    <div className="flex flex-col overflow-y-auto h-[calc(100vh-8.3rem)] justify-end p-3 py-0">
      <ScrollArea>
        {messages.length > 0 &&
          messages.map((message) => (
            <div key={message._id} ref={lastMessageRef}>
              <Message message={message} />
            </div>
          ))}
        {messages.length === 0 && (
          <div className="flex justify-center items-center text-[#ababab]"></div>
        )}
      </ScrollArea>
    </div>
  );
};

export default ChatSection;
