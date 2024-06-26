import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./context/authContext.tsx";
import RoomContextProvider from "./context/roomContext.tsx";
import MessageContextProvider from "./context/messageContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <RoomContextProvider>
          <MessageContextProvider>
            <App />
          </MessageContextProvider>
        </RoomContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
