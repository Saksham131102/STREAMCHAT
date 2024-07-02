import Btn from "./Btn";
import { RiPictureInPicture2Fill } from "react-icons/ri";
import { RiPictureInPictureExitFill } from "react-icons/ri";

interface PipProps {
  isPipMode: boolean;
  onToggle: () => void;
}

const Pip: React.FC<PipProps> = ({ isPipMode, onToggle }) => {
  return (
    <Btn label="Picture in Picture" onClick={onToggle}>
      {isPipMode ? <RiPictureInPictureExitFill /> : <RiPictureInPicture2Fill />}
    </Btn>
  );
};

export default Pip;
