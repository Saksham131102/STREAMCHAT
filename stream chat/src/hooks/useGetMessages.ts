import { useRoomContext } from "@/context/roomContext";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type IMessages = {
  _id: string;
  message: string;
  sender: string;
  room: string;
};

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<IMessages[]>([]);
  const { room } = useRoomContext();
  // console.log(room._id);

  useEffect(() => {
    if (room._id) {
      const getMessages = async () => {
        setLoading(true);
        try {
          const res = await fetch(
            `https://streamchat.onrender.com/api/message/${room._id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
            }
          );
          const data = await res.json();
          // console.log(data);
          // console.log(data.error);
          if (data.error) {
            throw new Error(data.error);
          }

          setMessages(data);
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

      getMessages();
    }
  }, []);

  return { loading, messages };
};

export default useGetMessages;
