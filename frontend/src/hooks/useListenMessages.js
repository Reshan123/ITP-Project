import { useEffect,useState } from "react";
import { useSocketContext } from "./useSocketContext";
import { useConversation } from "./useConversation";
import notificationSound from "../assets/notification.mp3";
const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();
  const [unreadMessages, setUnreadMessages] = useState(false);
  const [newMessages, setNewMessage] = useState([]);

  useEffect(() => {
    try {
      if (!socket) return;
      socket?.on("newMessage", (newMessage) => {
        // newMessage.shouldShake = true;
        const sound = new Audio(notificationSound);
        sound.play();
        setMessages([...messages, newMessage]);
        setUnreadMessages(true);
        // setNewMessage(newMessage);
        console.log("New message received:", newMessage);
        // unreadMessages(true)
      });

      return () => socket?.off("newMessage");
    } catch (error) {
      cosole.log(error.message);
    }
  }, [socket, setMessages, messages]);

  // Reset unreadMessages state when messages change
  // useEffect(() => {
  //   if (unreadMessages && messages.length > 0) {
  //     setUnreadMessages(false);
  //   }
  // }, [messages, unreadMessages]);
  
  return [unreadMessages, setUnreadMessages ];
};

export default useListenMessages;
