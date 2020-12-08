import React from "react";
import HomePage from "./pages/HomePage";
import { SocketProvider } from "./context/SocketContext";

export const BandNamesApp = () => {
  return (
    <SocketProvider>
      <HomePage />
    </SocketProvider>
  );
};
