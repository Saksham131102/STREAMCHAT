import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthContext } from "@/context/authContext";
import { LogOut, Settings2, User } from "lucide-react";
import useLogout from "@/hooks/useLogout";
import { ThreeDots } from "react-loader-spinner";

const DropdownMenuProfile = () => {
  const { authUser } = useAuthContext();
  const { loading, logout } = useLogout();

  const handleLogout = async (e: any) => {
    e.preventDefault();
    await logout();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="w-10 h-10 cursor-pointer">
          <AvatarImage src={authUser?.profilePic} alt="Profile" />
          <AvatarFallback>{authUser?.fullname[0]}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 border-[#ababab] text-[#ababab] font-poppins bg-[#2a2a2a] mr-2">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator className="border-b border-[#ababab]" />
        <DropdownMenuGroup>
          <div className="hover:bg-black rounded-md">
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
          </div>

          <div className="hover:bg-black rounded-md">
            <DropdownMenuItem className="cursor-pointer">
              <Settings2 className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
          </div>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="border-b border-[#ababab]" />
        <div onClick={handleLogout} className="hover:bg-black rounded-md">
          <DropdownMenuItem className="cursor-pointer">
            {loading ? (
              <ThreeDots
                visible={true}
                width={16}
                height={16}
                color="#ababab"
                ariaLabel="loading"
                wrapperClass="mr-2"
              />
            ) : (
              <LogOut className="mr-2 h-4 w-4" />
            )}
            <span>Logout</span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownMenuProfile;
