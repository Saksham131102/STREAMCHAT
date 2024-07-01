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
    <div className="flex flex-col overflow-y-auto h-[84vh] justify-end p-3">
      <ScrollArea>
        {messages.length > 0 &&
          messages.map((message) => (
            <div key={message._id} ref={lastMessageRef}>
              <Message message={message} />
            </div>
          ))}
        {messages.length === 0 && <p>No messages</p>}
      </ScrollArea>
    </div>
  );
};

export default ChatSection;
