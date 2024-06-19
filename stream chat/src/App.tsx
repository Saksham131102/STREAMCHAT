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

function App() {
  const { authUser } = useAuthContext();
  const { room } = useRoomContext();
  const navigate = useNavigate();
  const emptyUser = {
    _id: "",
    fullname: "",
    username: "",
    profilePic: "",
  };

  console.log(authUser);
  console.log(room);

  useEffect(() => {
    if (room._id !== "") {
      navigate("/home/room");
    } else {
      navigate("/home");
    }
  }, [room]);
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
          <Route path="room" element={<RoomPage />} />
        </Route>
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
