import CreateRoom from "./CreateRoom";
import JoinRoom from "./JoinRoom";

const CreateOrJoinRoom = () => {
  return (
    <div className="flex h-screen justify-center items-start pt-40">
      <div className="flex flex-col w-1/3 md:flex-row justify-center">
        <CreateRoom />
        <div className="divider text-[#ababab] font-semibold divider-error md:divider-horizontal">
          OR
        </div>
        <JoinRoom />
      </div>
    </div>
  );
};

export default CreateOrJoinRoom;
