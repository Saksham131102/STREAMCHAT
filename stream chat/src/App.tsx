import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Intro from "./pages/Intro";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/authContext";
import { useRoomContext } from "./context/roomContext";
// import Homepage from "./pages/root/Homepage";
import RoomPage from "./pages/root/RoomPage.tsx";
import { useEffect } from "react";
import { useSocketContext } from "@/context/socketContext";
import { useMessageContext } from "./context/messageContext.tsx";
import Homepage2 from "./pages/root/Homepage2.tsx";
import DynamicPage from "./pages/root/DynamicPage.tsx";
import RootLayout from "./pages/root/RootLayout.tsx";

function App() {
  const { authUser } = useAuthContext();
  const { room, setRoom } = useRoomContext();
  const { setMessages } = useMessageContext();
  const SocketContext = useSocketContext();

  if (!SocketContext) {
    return null;
  }

  const { socket } = SocketContext;

  const navigate = useNavigate();
  const isAuthenticated = authUser._id !== "";

  // useEffect(() => {
  //   if (room._id !== "") {
  //     navigate("/home/room");
  //   } else {
  //     navigate("/home");
  //   }
  // }, [room]);

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

      setMessages([]);
    });

    socket?.on("newMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    socket?.on("newVideo", (data) => {
      setRoom(data);
      localStorage.setItem("room", JSON.stringify(data));
    });

    return () => {
      socket?.off("userJoinedRoom");
      socket?.off("userLeftRoom");
      socket?.off("roomDeleted");
      socket?.off("newMessage");
      socket?.off("newVideo");
    };
  }, [socket, room]);
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            !isAuthenticated ? <Intro /> : <Navigate to="/browse/home" />
          }
        />
        <Route
          path="/signup"
          element={
            !isAuthenticated ? <Signup /> : <Navigate to="/browse/home" />
          }
        />
        <Route
          path="/login"
          element={
            !isAuthenticated ? <Login /> : <Navigate to="/browse/home" />
          }
        />
        <Route element={<RootLayout />}>
          <Route
            path="/browse/:pageName"
            element={!isAuthenticated ? <Navigate to="/" /> : <DynamicPage />}
          />
        </Route>

        {/* Nested Routes */}
        {/* <Route path="/home">
          <Route
            index={true}
            element={
              JSON.stringify(authUser) === JSON.stringify(emptyUser) ? (
                <Navigate to="/" />
              ) : (
                <Homepage2 />
              )
            }
          />
          <Route
            path="room"
            // element={room._id === "" ? <Navigate to="/home" /> : <RoomPage />}
            element={<RoomPage />}
          />
        </Route> */}
        {/* <Route
          path="/browse/home"
          element={!isAuthenticated ? <Navigate to="/" /> : <Homepage2 />}
        /> */}
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
