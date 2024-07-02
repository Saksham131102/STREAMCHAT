import { memo } from "react";

import Btn from "./Btn";
import { MdOutlineForward10 } from "react-icons/md";

interface SkipProps {
  onSkip: () => void;
}

const Skip: React.FC<SkipProps> = ({ onSkip }) => {
  return (
    <Btn label="+ 10 seconds" onClick={onSkip}>
      <MdOutlineForward10 />
    </Btn>
  );
};

export default memo(Skip);
