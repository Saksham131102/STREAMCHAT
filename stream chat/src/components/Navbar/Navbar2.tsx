import { useState } from "react";
import { Input } from "../ui/input";
import DropdownMenuProfile from "./DropdownMenuProfile";
import NameAndNavigations from "./NameAndNavigations";
import MenuSheet from "./MenuSheet";

const Navbar2 = () => {
  const [active, setActive] = useState<string>("Home");
  return (
    <div className="z-50 flex justify-between items-center px-4 md:px-10 lg:px-32 py-4 font-poppins sticky top-0 w-full bg-[#2a2a2a]">
      <div className="hidden lg:block">
        <NameAndNavigations active={active} setActive={setActive} />
      </div>
      <div className="block lg:hidden text-white">
        <MenuSheet active={active} setActive={setActive} />
      </div>
      <div className="flex gap-3">
        {/* Search Bar */}
        <Input
          className="w-60 bg-[#1f1f1f] text-gray-300 placeholder-[#ababab]"
          type="text"
          placeholder="Search"
        />
        {/* Profile with dropdown menu */}

        <DropdownMenuProfile />
      </div>
    </div>
  );
};

export default Navbar2;
