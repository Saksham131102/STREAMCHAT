import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./context/authContext.tsx";
import RoomContextProvider from "./context/roomContext.tsx";
import MessageContextProvider from "./context/messageContext.tsx";
import SocketContextProvider from "./context/socketContext.tsx";

// poppins font
import "@fontsource/poppins/300.css"; // Weight 300 (Light)
import "@fontsource/poppins/400.css"; // Weight 400 (Regular)
import "@fontsource/poppins/500.css"; // Weight 500 (Medium)
import "@fontsource/poppins/600.css"; // Weight 600 (Semi-Bold)
import "@fontsource/poppins/700.css"; // Weight 700 (Bold)

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <RoomContextProvider>
          <MessageContextProvider>
            <SocketContextProvider>
              <App />
            </SocketContextProvider>
          </MessageContextProvider>
        </RoomContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
