import ReactPlayer from "react-player";
import { Button } from "@/components/ui/button";
import { FormEvent, useState } from "react";
import axios from "axios";
import { useRoomContext } from "@/context/roomContext";
import toast from "react-hot-toast";
import { useAuthContext } from "@/context/authContext";
import { useSocketContext } from "@/context/socketContext";

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
        `http://localhost:3000/api/video/upload/${room._id}`,
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
    // <div>
    // <form
    //   onSubmit={handleFileUpload}
    //   className="flex flex-col items-start gap-3"
    // >
    //   <input type="file" accept="video/*" onChange={handleFileChange} />
    //   <Button type="submit">Submit</Button>
    // </form>
    // </div>
    // <ReactPlayer
    //   url={room.video.url}
    //   controls={true}
    //   width="100%"
    //   height="90%"
    // />
    <>
      {room.owner === authUser._id ? (
        room.video.public_id !== "" ? (
          <ReactPlayer
            url={room.video.url}
            controls={true}
            playing={false}
            width="100%"
            height="90%"
          />
        ) : (
          <form
            onSubmit={handleFileUpload}
            className="flex flex-col items-start gap-3"
          >
            <input type="file" accept="video/*" onChange={handleFileChange} />
            <Button disabled={loading} type="submit">
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        )
      ) : room.video.public_id !== "" ? (
        <ReactPlayer
          url={room.video.url}
          controls={false}
          width="100%"
          height="90%"
        />
      ) : (
        <p>No video uploaded yet by the owner</p>
      )}
    </>
  );
};

export default VideoSection;
