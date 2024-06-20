// import { AspectRatio } from "@/components/ui/aspect-ratio";
import ReactPlayer from "react-player";

const VideoSection = () => {
  return (
    // <AspectRatio ratio={2 / 1}>
    //   <img
    //     src="https://phlearn.com/wp-content/uploads/2019/03/fixed-ratio.png"
    //     alt="a boat"
    //   />
    // </AspectRatio>
    <ReactPlayer
      url={"https://www.pexels.com/video/a-tiger-inside-a-cage-5495322/"}
      controls={true}
      width="100%"
      height="90%"
    />
  );
};

export default VideoSection;
