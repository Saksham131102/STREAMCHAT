import { Button } from "@/components/ui/button";
import { useRoomContext } from "@/context/roomContext";

const handleLeaveRoom = () => {
  console.log("leave room");
};

const RoomPage = () => {
  const { room } = useRoomContext();
  console.log(room);
  return (
    <div>
      <div>RoomPage</div>
      <Button onClick={handleLeaveRoom}>Leave the room</Button>
    </div>
  );
};

export default RoomPage;
