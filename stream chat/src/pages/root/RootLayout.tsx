import Navbar2 from "@/components/Navbar/Navbar2";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <Navbar2 />
      <div className="m-4">
        <Outlet />
      </div>
    </>
  );
};

export default RootLayout;
