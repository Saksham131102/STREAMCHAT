import CreateOrJoinRoom from "@/components/CreateOrJoinRoom";
import Navbar from "@/components/Navbar";
import UserDetails from "@/components/UserDetails";

const Homepage = () => {
  return (
    <div className="bg-[#2a2a2a]">
      <Navbar />
      <h1 className="text-4xl font-bold pt-36 pl-10 md:pl-32">
        <span className="text-[#dd0808]">Welcome</span>
        <span className="text-[#ababab]"> Back!</span>
      </h1>
      <UserDetails />
      <CreateOrJoinRoom />
    </div>
  );
};

export default Homepage;
