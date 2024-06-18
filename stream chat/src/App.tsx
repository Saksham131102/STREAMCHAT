import { Navigate, Route, Routes } from "react-router-dom";
import Intro from "./pages/Intro";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/authContext";
import { useRoomContext } from "./context/roomContext";
import Homepage from "./pages/root/Homepage";
import RoomPage from "./pages/root/RoomPage.tsx";

function App() {
  const { authUser } = useAuthContext();
  const { room } = useRoomContext();
  const emptyUser = {
    _id: "",
    fullname: "",
    username: "",
    profilePic: "",
  };
  const emptyRoom = {
    _id: "",
    name: "",
    owner: "",
    participants: [],
  };

  // console.log(room);
  // console.log(JSON.stringify(room));
  // console.log(JSON.stringify(emptyRoom));
  // console.log(JSON.stringify(room) === JSON.stringify(emptyRoom));
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
        <Route
          path="/home"
          element={
            JSON.stringify(authUser) === JSON.stringify(emptyUser) ? (
              <Navigate to="/" />
            ) : (
              <Homepage />
            )
          }
        >
          <Route path="room" element={<RoomPage />} />
          {/* <Route
            path="room"
            element={
              room._id === "" ? (
                <Navigate to="/home" />
              ) : (
                (console.log("room page rendering"), (<RoomPage />))
              )
            }
          /> */}
        </Route>
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
