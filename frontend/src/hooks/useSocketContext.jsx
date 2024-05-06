import { useContext } from "react";
import { SocketContext } from "../context/SocketContext";

export const useSocketContext = () => {
  return useContext(SocketContext);
};