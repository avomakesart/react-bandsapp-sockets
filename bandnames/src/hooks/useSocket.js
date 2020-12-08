import { useEffect, useMemo, useState } from "react";
import io from "socket.io-client";

export const useSocket = (serverPath) => {
  const [online, setOnline] = useState(false);
  const socket = useMemo(
    () =>
      io.connect(serverPath, {
        transports: ["websocket"],
      }),
    [serverPath]
  );

  useEffect(() => {
    setOnline(socket.connected);
  }, [socket]);

  useEffect(() => {
    socket.on("connect", () => {
      setOnline(true);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("disconnect", () => {
      setOnline(false);
    });
  }, [socket]);

  return { socket, online };
};
