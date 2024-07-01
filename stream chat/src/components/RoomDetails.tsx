import { GiExitDoor } from "react-icons/gi";
import { MdDelete } from "react-icons/md";
import { Button } from "./ui/button";
import { useRoomContext } from "@/context/roomContext";
import useLeaveRoom from "@/hooks/useLeaveRoom";
import { useAuthContext } from "@/context/authContext";
import useDeleteRoom from "@/hooks/useDeleteRoom";

const RoomDetails = () => {
  const { room } = useRoomContext();
  const { authUser } = useAuthContext();
  const { loading: isLeaving, leaveRoom } = useLeaveRoom();
  const { loading: isDeleting, deleteRoom } = useDeleteRoom();

  // console.log(room._id);

  const handleLeave = async () => {
    await leaveRoom();
  };

  const handleDelete = async () => {
    await deleteRoom();
  };

  return (
    <div className="flex justify-between p-3 border-y border-[#ababab] text-[#ababab]">
      <div className="flex flex-col justify-center">
        <div className="text-xl line-clamp-1">Room: {room?.name}</div>
      </div>
      <div className="flex items-center">
        {room.owner === authUser._id ? (
          isDeleting ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            <Button
              onClick={handleDelete}
              className="bg-[#dd0808] hover:bg-[#C30A0A] rounded-md p-0.5"
            >
              <MdDelete className="text-3xl text-white" />
            </Button>
          )
        ) : isLeaving ? (
          <span className="loading loading-spinner loading-sm"></span>
        ) : (
          <Button
            onClick={handleLeave}
            className="bg-[#dd0808] hover:bg-[#C30A0A] rounded-md p-0.5"
          >
            <GiExitDoor className="text-3xl text-white" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default RoomDetails;
