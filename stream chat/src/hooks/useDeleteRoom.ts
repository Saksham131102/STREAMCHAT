import { useRoomContext } from "@/context/roomContext";
import React, { useState } from "react";
import toast from "react-hot-toast";

const useDeleteRoom = () => {
  const [loading, setLoading] = useState(false);
  const { room, setRoom } = useRoomContext();

  const deleteRoom = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:3000/api/room/delete/${room._id}`,
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
      localStorage.removeItem("room");
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
