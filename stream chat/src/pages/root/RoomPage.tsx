import RoomNavbar from "@/components/RoomNavbar";
import RoomSection from "@/components/RoomSection";
import VideoSection from "@/components/VideoSection";

const RoomPage = () => {
  return (
    <div>
      <RoomNavbar />
      <div className="grid grid-cols-5 h-screen bg-black">
        <div className="col-span-4 flex items-center justify-center border-r border-[#ababab]">
          <VideoSection />
        </div>
        <div className="col-span-1">
          <RoomSection />
        </div>
      </div>
    </div>
  );
};

export default RoomPage;
