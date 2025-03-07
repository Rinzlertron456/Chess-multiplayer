import { useEffect, useState } from "react";

const URL = "ws://localhost:8085";

export const useSocket = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const ws = new WebSocket(URL);
    ws.onopen = () => {
      console.log("connected");
      setSocket(ws);
    };
    ws.onclose = () => {
      console.log("disconnected");
      setSocket(null);
    };
    // causing network bug
    // return () => {
    //   ws.close();
    // };
  }, []);
  return socket;
};
