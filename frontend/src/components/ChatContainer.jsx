import { useRef, useEffect } from "react";
import {useChatStore} from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import {formatMessageTime} from "../lib/utils"; 
import { useAuthStore } from "../store/useAuthStore";

const ChatContainer = () => {

  const {messages, getMessages, isMessagesLoading, selectedUser, subscribeToMessages, unsubscribeFromMessages} = useChatStore();
  const { authUser } = useAuthStore();

const messageEndRef = useRef(null);

useEffect(() => {
    getMessages(selectedUser._id);

  subscribeToMessages();

  return () => unsubscribeFromMessages();

}, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);



// if(isMessagesLoading)return <div>Loading...</div>

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }



  return (

    <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />



       <div className="flex-1 overflow-y-auto p-4 space-y-4">
  {messages.map((message, index) => {
    try {
      console.log("message:", message);
      console.log("authUser:", authUser);
      console.log("selectedUser:", selectedUser);

      const isSentByMe = message?.senderId === authUser?._id;
      const profilePic = isSentByMe
        ? authUser?.profilePic || "/avatar.png"
        : selectedUser?.profilePic || "/avatar.png";

      return (
        <div
          key={message?._id || index}
          className={`chat ${isSentByMe ? "chat-end" : "chat-start"}`}
          ref={messageEndRef}
        >
          <div className="chat-image avatar">
            <div className="size-10 rounded-full border">
              <img src={profilePic} alt="profile pic" />
            </div>
          </div>

          <div className="chat-header mb-1">
            <time className="text-xs opacity-50 ml-1">
              {message?.createdAt
                ? formatMessageTime(message.createdAt)
                : "just now"}
            </time>
          </div>

          <div className="chat-bubble flex flex-col">
            {message?.image && (
              <img
                src={message.image}
                alt="Attachment"
                className="sm:max-w-[200px] rounded-md mb-2"
              />
            )}
            {message?.text && <p>{message.text}</p>}
          </div>
        </div>
      );
    } catch (err) {
      console.error("Error rendering message:", err);
      return (
        <div key={index} className="text-red-500">
          Error rendering this message
        </div>
      );
    }
  })}
</div>

        

        <MessageInput />
      
    </div>
    
  )
}

export default ChatContainer