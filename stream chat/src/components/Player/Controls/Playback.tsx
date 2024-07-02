import { memo } from "react";

import Btn from "./Btn";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";

interface PlaybackProps {
  isPlaying: boolean;
  onToggle: () => void;
}

const Playback: React.FC<PlaybackProps> = ({ isPlaying, onToggle }) => (
  <Btn label={isPlaying ? "Pause" : "Play"} onClick={onToggle}>
    {isPlaying ? <FaPause /> : <FaPlay />}
  </Btn>
);

export default memo(Playback);
