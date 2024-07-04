import { useAuthContext } from "@/context/authContext";

const UserDetails = () => {
  const { authUser } = useAuthContext();

  return (
    <div className="flex items-center pl-10 md:pl-32 mt-5">
      <div className="avatar">
        <div className="w-16 rounded-full -z-10">
          <img src={authUser?.profilePic} />
        </div>
      </div>
      <div className="flex flex-col text-[#ababab]">
        <div className="pl-5 text-xl font-semibold">{authUser?.fullname}</div>
        <div className="pl-5 font-medium text-[#a2302e]">
          username: {authUser?.username}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
