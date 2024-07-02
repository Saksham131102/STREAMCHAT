import { memo } from "react";

import Btn from "./Btn";
import { FaGear } from "react-icons/fa6";

interface SettingsProps {
  onToggle: () => void;
}

const Settings: React.FC<SettingsProps> = ({ onToggle }) => {
  return (
    <Btn label="Settings" onClick={onToggle}>
      <FaGear />
    </Btn>
  );
};

export default memo(Settings);
