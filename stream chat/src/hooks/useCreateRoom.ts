import { useRoomContext } from "@/context/roomContext";
import { useState } from "react";
import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

interface CreateRoomProps {
  name: string;
  password: string;
}

const useCreateRoom = () => {
  const [loading, setLoading] = useState(false);
  const { setRoom } = useRoomContext();

  const createRoom = async ({ name, password }: CreateRoomProps) => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/room/create", {
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
      // navigate(`/home/${data.name}`);
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
  return { loading, createRoom };
};

export default useCreateRoom;
