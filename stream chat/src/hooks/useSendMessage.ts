import { useMessageContext } from "@/context/messageContext";
import { useRoomContext } from "@/context/roomContext";
import { useSocketContext } from "@/context/socketContext";
import { useState } from "react";
import toast from "react-hot-toast";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { room } = useRoomContext();
  const { messages, setMessages } = useMessageContext();
  const SocketContext = useSocketContext();

  if (!SocketContext) {
    throw new Error("Socket context not found");
  }

  const { socket } = SocketContext;

  const sendMessage = async (message: string) => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:8000/api/message/send/${room._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message,
          }),
          credentials: "include",
        }
      );

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      socket?.emit("sendMessage", data);
      setMessages([...messages, data]);
      setLoading(false);
    } catch (error: any) {
      toast(`${error.message}`, {
        icon: "❌",
        style: {
          background: "#7f1e1d",
          color: "#fff",
        },
      });
    } finally {
      setLoading(false);
    }
  };
  return { loading, sendMessage };
};

export default useSendMessage;
