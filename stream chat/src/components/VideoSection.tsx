import { Button } from "@/components/ui/button";
import { FormEvent, useState } from "react";
import axios from "axios";
import { useRoomContext } from "@/context/roomContext";
import toast from "react-hot-toast";
import { useAuthContext } from "@/context/authContext";
import { useSocketContext } from "@/context/socketContext";
import { FaVideoSlash } from "react-icons/fa";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import VideoPlayer from "./Player/VideoPlayer";

const VideoSection = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { room, setRoom } = useRoomContext();
  const { authUser } = useAuthContext();
  const SocketContext = useSocketContext();

  if (!SocketContext) {
    throw new Error("Socket context not found");
  }

  const { socket } = SocketContext;

  const handleFileChange = (e: any) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };
  const handleFileUpload = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log(file);

    if (!file) {
      console.error("No file selected");
      toast(`No file selected`, {
        icon: "❌",
        style: {
          background: "#7f1e1d",
          color: "#fff",
        },
      });
      return;
    }
    const formData = new FormData();
    formData.append("video", file);
    try {
      const response = await axios.post(
        `https://streamchat.onrender.com/api/video/upload/${room._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const data = await response.data;
      if (data.error) {
        throw new Error(data.error);
      }

      socket?.emit("sendVideo", data, room._id);
      setRoom(data);
      localStorage.setItem("room", JSON.stringify(data));
    } catch (error: any) {
      toast(`${error.message}`, {
        icon: "❌",
        style: {
          background: "#7f1e1d",
          color: "#fff",
        },
      });
    }

    setLoading(false);
  };

  return (
    <>
      {room.owner === authUser._id ? (
        room.video.public_id !== "" ? (
          <VideoPlayer src={room.video.url} autoPlay={false} controls={true} />
        ) : (
          <form
            onSubmit={handleFileUpload}
            className="flex flex-col items-start gap-3"
          >
            <Label htmlFor="video" className="text-[#ababab]">
              Upload a Video
            </Label>
            <Input
              id="video"
              className="cursor-pointer text-gray-300"
              type="file"
              accept="video/*"
              onChange={handleFileChange}
            />
            <Button
              className="bg-[#dd0808] hover:bg-[#C30A0A] text-white"
              disabled={loading}
              type="submit"
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        )
      ) : room.video.public_id !== "" ? (
        <VideoPlayer src={room.video.url} autoPlay={false} controls={false} />
      ) : (
        <div className="flex flex-col justify-center items-center gap-3 text-[#ababab]">
          <FaVideoSlash className="w-20 h-20" />
          Wait for the owner to upload the video
        </div>
      )}
    </>
  );
};

export default VideoSection;
