import { useRef, useState } from "react";
import { Button } from "./ui/button";
import useSendMessage from "@/hooks/useSendMessage";
import { IoIosSend } from "react-icons/io";
import { Textarea } from "@/components/ui/textarea";

const SendMessage = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = (e: any) => {
    e.prefentDefault;
    sendMessage(message);
    setMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend(e);
    } else if (e.key === "Enter" && e.shiftKey) {
      // Move the cursor to the new line
      if (textareaRef.current) {
        setTimeout(() => {
          textareaRef.current!.scrollTop = textareaRef.current!.scrollHeight;
        }, 0);
      }
    }
  };
  return (
    <div className="flex relative p-3 items-center gap-2 border-b border-[#ababab]">
      <Textarea
        className="line-clamp-1 break-words overflow-auto p-2 min-h-[42px] max-h-[42px]  w-full border-[#ababab] border-2 pl-4 pr-12 focus-visible:ring-0 focus-visible:ring-offset-0"
        // type="text"
        value={message}
        ref={textareaRef}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder=""
      />
      <Button
        onClick={handleSend}
        className="absolute right-3 rounded-full bg-transparent hover:bg-inherit"
        disabled={loading || !message}
      >
        <IoIosSend className="text-white text-xl" />
      </Button>
    </div>
  );
};

export default SendMessage;
