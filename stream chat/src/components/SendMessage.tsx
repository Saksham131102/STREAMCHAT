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

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    adjustTextareaHeight();
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current as HTMLTextAreaElement;
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  };

  return (
    <div className="flex p-3 items-center gap-2 border-b border-[#ababab]">
      <Textarea
        className="text-[#ababab] bg-black break-words overflow-auto p-2 min-h-[40px] max-h-[40px] w-full border-[#ababab] border-[1px] pl-4 pr-12 focus-visible:ring-0 focus-visible:ring-offset-0"
        value={message}
        ref={textareaRef}
        onChange={handleInput}
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
