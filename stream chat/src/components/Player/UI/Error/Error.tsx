import { memo } from "react";

import { IoReload } from "react-icons/io5";
import "./Error.css";

interface ErrorProps {
  error: MediaError | null;
}

const Error: React.FC<ErrorProps> = ({ error }) => {
  const refreshHandler = () => {
    window.location.reload();
  };

  return error ? (
    <div className="vp-error">
      <p>
        {error.code ? `${error.code}: ` : ""}
        {error.message || "Error occurred! Please try again"}
      </p>
      <span onClick={refreshHandler}>
        <IoReload />
      </span>
    </div>
  ) : null;
};

export default memo(Error);
