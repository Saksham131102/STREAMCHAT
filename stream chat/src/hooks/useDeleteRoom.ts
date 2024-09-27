import { useMessageContext } from "@/context/messageContext";
import { useRoomContext } from "@/context/roomContext";
import { useSocketContext } from "@/context/socketContext";
import { useState } from "react";
import toast from "react-hot-toast";

const useDeleteRoom = () => {
  const [loading, setLoading] = useState(false);
  const { room, setRoom } = useRoomContext();
  const { setMessages } = useMessageContext();
  const SocketContext = useSocketContext();

  if (!SocketContext) {
    throw new Error("Socket context not found");
  }

  const { socket } = SocketContext;

  const deleteRoom = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:8000/api/room/delete/${room._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      socket?.emit("deleteRoom", room._id);
      // delete the room from local storage
      localStorage.removeItem("room");
      // set the messages to an empty array so that in context, useEffect removes the messages from the local storage
      setMessages([]);
      setRoom(data);
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
  return { loading, deleteRoom };
};

export default useDeleteRoom;
