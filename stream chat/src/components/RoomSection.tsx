import ChatSection from "./ChatSection";
import RoomDetails from "./RoomDetails";
import SendMessage from "./SendMessage";

const RoomSection = () => {
  return (
    <div>
      <RoomDetails />
      <ChatSection />
      <SendMessage />
    </div>
  );
};

export default RoomSection;
