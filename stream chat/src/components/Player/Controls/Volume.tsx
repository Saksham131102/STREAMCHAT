import { memo } from "react";

import Btn from "./Btn";
import { IoVolumeHigh } from "react-icons/io5";
import { IoVolumeMedium } from "react-icons/io5";
import { IoVolumeLow } from "react-icons/io5";
import { IoVolumeMute } from "react-icons/io5";

interface VolumeProps {
  volume: number;
  onToggle: () => void;
  onSeek: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Volume: React.FC<VolumeProps> = ({ volume, onToggle, onSeek }) => {
  return (
    <div className="vp-volume">
      <Btn onClick={onToggle}>
        {volume > 0.7 && <IoVolumeHigh />}
        {volume <= 0.7 && volume > 0.3 && <IoVolumeMedium />}
        {volume <= 0.3 && volume > 0 && <IoVolumeLow />}
        {volume === 0 && <IoVolumeMute />}
      </Btn>
      <div className="vp-volume__range">
        <div className="vp-volume__range--background" />
        <div
          className="vp-volume__range--current"
          style={{ width: `${volume * 100}%` }}
        >
          <div className="vp-volume__range--current__thumb" />
        </div>
        <input
          className="vp-volume__range--seek"
          type="range"
          value={volume}
          max="1"
          step="0.05"
          onChange={onSeek}
        />
      </div>
    </div>
  );
};

export default memo(Volume);
