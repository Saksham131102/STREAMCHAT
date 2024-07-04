import { useState } from "react";
import { useRoomContext } from "@/context/roomContext";
import toast from "react-hot-toast";

interface JoinRoomProps {
  name: string;
  password: string;
}

const useJoinRoom = () => {
  const [loading, setLoading] = useState(false);
  const { setRoom } = useRoomContext();

  const joinRoom = async ({ name, password }: JoinRoomProps) => {
    setLoading(true);
    try {
      const res = await fetch("https://streamchat.onrender.com/api/room/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          password,
        }),
        credentials: "include",
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      // .emit() event being sent to the server to join the room
      // socket?.emit("joinRoom", data._id);
      localStorage.setItem("room", JSON.stringify(data));
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

  return { loading, joinRoom };
};

export default useJoinRoom;
