import { memo } from "react";

import Btn from "./Btn";
import { MdFullscreen } from "react-icons/md";
import { MdFullscreenExit } from "react-icons/md";

interface FullscreenProps {
  isFullscreen: boolean;
  onToggle: () => void;
}

const Fullscreen: React.FC<FullscreenProps> = ({ isFullscreen, onToggle }) => (
  <Btn
    label={isFullscreen ? "Fullscreen Off" : "Fullscreen"}
    onClick={onToggle}
  >
    {!isFullscreen && <MdFullscreen />}
    {isFullscreen && <MdFullscreenExit />}
  </Btn>
);

export default memo(Fullscreen);
