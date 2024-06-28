import { createContext, useContext, useEffect, useState } from "react";

interface IRoom {
  _id: string;
  name: string;
  owner: string;
  // participants: string[];
  video: {
    name: string;
    public_id: string;
    url: string;
  };
}

interface RoomContextType {
  room: IRoom;
  setRoom: React.Dispatch<React.SetStateAction<IRoom>>;
}

const INITIAL_STATE = {
  room: {
    _id: "",
    name: "",
    owner: "",
    // participants: [],
    video: {
      name: "",
      public_id: "",
      url: "",
    },
  },
  setRoom: () => {},
};

export const RoomContext = createContext<RoomContextType>(INITIAL_STATE);

const RoomContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [room, setRoom] = useState<IRoom>(INITIAL_STATE.room);

  useEffect(() => {
    const room = localStorage.getItem("room");
    if (room) {
      setRoom(JSON.parse(room));
    }
  }, []);

  return (
    <RoomContext.Provider value={{ room, setRoom }}>
      {children}
    </RoomContext.Provider>
  );
};

export default RoomContextProvider;

export const useRoomContext = () => {
  return useContext(RoomContext);
};
