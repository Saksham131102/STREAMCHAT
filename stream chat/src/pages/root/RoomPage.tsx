import RoomNavbar from "@/components/RoomNavbar";
import RoomSection from "@/components/RoomSection";
import VideoSection from "@/components/VideoSection";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useEffect } from "react";

const RoomPage = () => {
  useEffect(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  }, []);
  return (
    <div>
      {/* <RoomNavbar /> */}
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel
          defaultSize={75}
          className="flex items-center justify-center border border-[#ababab]"
        >
          <VideoSection />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={25} className="border border-[#ababab]">
          <RoomSection />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default RoomPage;
