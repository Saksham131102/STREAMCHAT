import { useMessageContext } from "@/context/messageContext";
import { useRoomContext } from "@/context/roomContext";
import { useState } from "react";
import toast from "react-hot-toast";

const useLeaveRoom = () => {
  const [loading, setLoading] = useState(false);
  const { room, setRoom } = useRoomContext();
  const { setMessages } = useMessageContext();

  const leaveRoom = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/room/leave/${room._id}`,
        {
          method: "POST",
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
      console.log(data);
      localStorage.removeItem("room");
      setMessages([]);
      setRoom({
        _id: "",
        name: "",
        owner: "",
        participants: [],
        video: {
          public_id: "",
          url: "",
        },
      });
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
  return { loading, leaveRoom };
};

export default useLeaveRoom;
