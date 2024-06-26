import { useMessageContext } from "@/context/messageContext";
// import useGetMessages from "@/hooks/useGetMessages";

const ChatSection = () => {
  // const { loading, messages } = useGetMessages();
  const { messages } = useMessageContext();
  // console.log(messages);
  return (
    <div className="flex flex-col overflow-auto h-[84vh] justify-end p-3">
      {messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id}>
            <div>{message.message}</div>
          </div>
        ))}
      {messages.length === 0 && <p>No messages</p>}
    </div>
  );
};

export default ChatSection;
