import { useEffect, useState } from "react";
import { useConversation } from "./useConversation";
import { useUserContext } from "./userContextHook";
//import toast from "react-hot-toast";

const useGetMessages = (ownerid) => {
  const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();
    const { user } = useUserContext();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:4000/api/messages/${ownerid}`,
          {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${user.userToken}`,
            },
          }
        );
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setMessages(data);
      } catch (error) {
          //toast.error(error.message);
          console.error(error);
      } finally {
        setLoading(false);
      }
    };

    //checking id is null or not so that application donot break when getiing msg of undefined id
    if (ownerid != null) getMessages();
  }, [ownerid , setMessages]);

  return { messages, loading };
};
export default useGetMessages;
