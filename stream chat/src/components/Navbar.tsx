import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";

const Navbar = () => {
  return (
    <div className="z-10 navbar bg-[#2a2a2a] md:px-32 px-10 shadow-xl fixed py-5 font-poppins">
      <div className="flex-1">
        <h1 className="text-3xl font-semibold ">
          <span className="text-[#ababab]">Stream</span>
          <span className="text-[#dd0808]">Chat</span>
        </h1>
      </div>
      <div className="flex-none">
        {localStorage.getItem("user") ? (
          <LogoutButton />
        ) : (
          <Link to={"/login"}>
            <Button className="bg-[#dd0808] rounded-md hover:bg-[#C30A0A]">
              <h2 className="text-white text-lg">Login</h2>
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
