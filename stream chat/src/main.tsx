import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./context/authContext.tsx";
import RoomContextProvider from "./context/roomContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <RoomContextProvider>
          <App />
        </RoomContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
