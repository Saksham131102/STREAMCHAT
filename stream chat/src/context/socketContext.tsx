import { createContext, useContext, useEffect, useState } from "react";

import io, { Socket } from "socket.io-client";
import { useAuthContext } from "./authContext";

interface SocketContextType {
  socket: Socket | null;
}

const SocketContext = createContext<SocketContextType | null>(null);

const SocketContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser) {
      const socket = io("http://localhost:3000", {
        query: {
          userId: authUser._id,
        },
      });
      setSocket(socket);

      return () => {
        socket.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

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
