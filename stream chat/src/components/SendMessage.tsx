import { useState } from "react";
import { IoSend } from "react-icons/io5";
import { Button } from "./ui/button";

const SendMessage = () => {
  const [message, setMessage] = useState("");
  const handleSend = (e: any) => {
    e.prefentDefault;
    console.log(message);
    setMessage("");
  };
  return (
    <div className="flex p-3 items-center gap-2">
      <input
        className="line-clamp-1 p-2 rounded-full w-full"
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter the message"
      />
      <Button
        onClick={handleSend}
        className="rounded-full bg-[#dd0808] hover:bg-[#C30A0A]"
      >
        <IoSend className="text-white" />
      </Button>
    </div>
  );
};

export default SendMessage;
