import { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";

function useSocket() {
  const [socket, setSocket] = useState<Socket>(null);

  useEffect(() => {
    fetch("/api/socketio").finally(() => {
      // setSocket(io());
      // const socket = io()
      setSocket(io());
    });

    return () => {
      setSocket(null);
    };
  }, []);

  return socket;
}

export default useSocket;
