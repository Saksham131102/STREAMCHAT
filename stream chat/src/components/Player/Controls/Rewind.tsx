import { memo } from "react";

import Btn from "./Btn";
import { MdOutlineReplay10 } from "react-icons/md";

interface RewindProps {
  onRewind: () => void;
}

const Rewind: React.FC<RewindProps> = ({ onRewind }) => {
  return (
    <Btn label="- 10 seconds" onClick={onRewind}>
      <MdOutlineReplay10 />
    </Btn>
  );
};

export default memo(Rewind);
