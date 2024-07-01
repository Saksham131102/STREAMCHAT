import formatTime from "@/utils";
import { useAuthContext } from "@/context/authContext";

type MessageProps = {
  message: {
    _id: string;
    message: string;
    sender: string;
    profilePic: string;
    room: string;
    time: string;
  };
};

const Message = ({ message }: MessageProps) => {
  const { authUser } = useAuthContext();

  const isMe = message.sender === authUser?.username;
  const chatClass = isMe ? "chat-end" : "chat-start";

  return (
    <div className={`text-[#ababab] chat ${chatClass}`}>
      {!isMe && (
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src={message.profilePic}
            />
          </div>
        </div>
      )}
      <div className="chat-header">
        {isMe ? "me" : message.sender}
        <time className="text-xs opacity-50"> {formatTime(message.time)}</time>
      </div>
      <div
        className={`chat-bubble whitespace-pre-wrap ${
          isMe ? "bg-[#dd0808]" : "bg-[#1e1e1e]"
        } text-[white]`}
      >
        {message.message}
      </div>
    </div>
  );
};

export default Message;
