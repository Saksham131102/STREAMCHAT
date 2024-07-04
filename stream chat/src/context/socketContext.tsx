import { createContext, useContext, useEffect, useState } from "react";

import io, { Socket } from "socket.io-client";
import { useAuthContext } from "./authContext";
import { useRoomContext } from "./roomContext";

interface SocketContextType {
  socket: Socket | null;
}

const SocketContext = createContext<SocketContextType | null>(null);

const SocketContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { authUser } = useAuthContext();
  const { room } = useRoomContext();

  useEffect(() => {
    if (room._id !== "") {
      const socket = io("https://streamchat.onrender.com", {
        query: {
          userId: authUser._id,
          roomId: room._id,
        },
      });
      setSocket(socket);

      return () => {
        socket.close();
        setSocket(null);
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser, room]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;

export const useSocketContext = () => {
  return useContext(SocketContext);
};
