import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Intro from "./pages/Intro";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/authContext";
import { useRoomContext } from "./context/roomContext";
import Homepage from "./pages/root/Homepage";
import RoomPage from "./pages/root/RoomPage.tsx";
import { useEffect } from "react";
import { useSocketContext } from "@/context/socketContext";
import { useMessageContext } from "./context/messageContext.tsx";

function App() {
  const { authUser } = useAuthContext();
  const { room, setRoom } = useRoomContext();
  const { setMessages } = useMessageContext();
  const SocketContext = useSocketContext();

  if (!SocketContext) {
    return null;
  }

  const { socket } = SocketContext;

  console.log(room);
  const navigate = useNavigate();
  const emptyUser = {
    _id: "",
    fullname: "",
    username: "",
    profilePic: "",
  };

  useEffect(() => {
    if (room._id !== "") {
      navigate("/home/room");
    } else {
      navigate("/home");
    }
  }, [room]);

  useEffect(() => {
    socket?.on("userJoinedRoom", (data) => {
      console.log(data.userId, "has joined the room", data.roomId);
    });

    socket?.on("userLeftRoom", (data) => {
      console.log(data.leftUserId, "has left the room", data.roomId);
    });

    socket?.on("roomDeleted", (roomId) => {
      console.log(roomId, "has been deleted by the owner");
      localStorage.removeItem("room");
      localStorage.removeItem("messages");
      setRoom({
        _id: "",
        name: "",
        owner: "",
        // participants: [],
        video: {
          name: "",
          public_id: "",
          url: "",
        },
      });
    });

    socket?.on("newMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket?.off("userJoinedRoom");
      socket?.off("userLeftRoom");
      socket?.off("roomDeleted");
      socket?.off("newMessage");
    };
  }, [socket, room]);
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            JSON.stringify(authUser) === JSON.stringify(emptyUser) ? (
              <Intro />
            ) : (
              <Navigate to="/home" />
            )
          }
        />
        <Route
          path="/signup"
          element={
            JSON.stringify(authUser) === JSON.stringify(emptyUser) ? (
              <Signup />
            ) : (
              <Navigate to="/home" />
            )
          }
        />
        <Route
          path="/login"
          element={
            JSON.stringify(authUser) === JSON.stringify(emptyUser) ? (
              <Login />
            ) : (
              <Navigate to="/home" />
            )
          }
        />

        {/* Nested Routes */}
        <Route path="/home">
          <Route
            index={true}
            element={
              JSON.stringify(authUser) === JSON.stringify(emptyUser) ? (
                <Navigate to="/" />
              ) : (
                <Homepage />
              )
            }
          />
          <Route
            path="room"
            // element={room._id === "" ? <Navigate to="/home" /> : <RoomPage />}
            element={<RoomPage />}
          />
        </Route>
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
