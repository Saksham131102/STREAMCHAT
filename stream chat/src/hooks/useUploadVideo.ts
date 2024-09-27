import { useRoomContext } from "@/context/roomContext";
import { useState } from "react";
import toast from "react-hot-toast";

const useUploadVideo = () => {
  const [loading, setLoading] = useState(false);
  const { setRoom } = useRoomContext();

  const uploadVideo = async ({
    roomId,
    videoName,
  }: {
    roomId: string;
    videoName: string;
  }) => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/video/add", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ roomId, videoName }),
        credentials: "include",
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

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
  return { loading, uploadVideo };
};

export default useUploadVideo;
