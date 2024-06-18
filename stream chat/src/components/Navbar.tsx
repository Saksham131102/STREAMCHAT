import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";

const Navbar = () => {
  return (
    <div className="navbar bg-[#2a2a2a] md:px-32 px-10 shadow-xl fixed py-5">
      <div className="flex-1">
        <div className="text-3xl font-bold">
          <span className="text-[#ababab]">Stream</span>
          <span className="text-[#dd0808]">Chat</span>
        </div>
      </div>
      <div className="flex-none">
        {localStorage.getItem("user") ? (
          <LogoutButton />
        ) : (
          <Link to={"/login"}>
            <Button className="bg-[#dd0808] rounded-md hover:bg-[#C30A0A]">
              <span className="text-white text-lg">Login</span>
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
