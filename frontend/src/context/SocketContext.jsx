import { createContext, useState, useEffect } from "react";
import { useUserContext } from "../hooks/userContextHook";
import io from "socket.io-client";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { user } = useUserContext()
    
    useEffect(() => {
      if (user) {
        const socket = io("http://localhost:4000", {
          query: {
            userId: user.uid,
          },
        });
        setSocket(socket);

        // socket.on() is used to listen to the events. can be used both on client and server side
        socket.on("getOnlineUsers", (users) => {
          setOnlineUsers(users);
        });

        //closing socket after its connnected
        return () => socket.close();
      } else {
        if (socket) {
          socket.close();
          setSocket(null);
        }
      }
    }, [user]);

    return (
      <SocketContext.Provider value={{ socket, onlineUsers }}>
        {children}
      </SocketContext.Provider>
    );
};