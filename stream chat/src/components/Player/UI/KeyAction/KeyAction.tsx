import { forwardRef, memo, useImperativeHandle, useRef } from "react";
import { CSSTransition } from "react-transition-group";

import { IoVolumeHigh } from "react-icons/io5";
import { IoVolumeMedium } from "react-icons/io5";
import { IoVolumeLow } from "react-icons/io5";
import { IoVolumeMute } from "react-icons/io5";
import { MdOutlineReplay10 } from "react-icons/md";
import { MdOutlineForward10 } from "react-icons/md";
import "./KeyAction.css";

export interface KeyActionHandle {
  rewind: HTMLDivElement;
  skip: HTMLDivElement;
}

interface KeyActionProps {
  on: boolean;
  volume: number;
}

const KeyAction = forwardRef<KeyActionHandle, KeyActionProps>(
  ({ on, volume }, ref) => {
    const rewindRef = useRef<HTMLDivElement>(null);
    const skipRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
      get rewind() {
        return rewindRef.current!;
      },
      get skip() {
        return skipRef.current!;
      },
    }));

    return (
      <div className="vp-key-action">
        <CSSTransition
          in={on}
          classNames="vp-key-volume"
          timeout={300}
          mountOnEnter
          unmountOnExit
        >
          <div className="vp-key-action__volume">
            <div className="vp-key-action__volume__container">
              <div className="vp-key-action__volume__icon">
                {volume > 0.7 && <IoVolumeHigh />}
                {volume <= 0.7 && volume > 0.3 && <IoVolumeMedium />}
                {volume <= 0.3 && volume > 0 && <IoVolumeLow />}
                {volume === 0 && <IoVolumeMute />}
              </div>
              <div className="vp-key-action__volume__range">
                <div className="vp-key-action__volume__range--background" />
                <div
                  className="vp-key-action__volume__range--current"
                  style={{ width: `${volume * 100}%` }}
                />
              </div>
            </div>
          </div>
        </CSSTransition>

        <div className="vp-key-action__progress rewind" ref={rewindRef}>
          <div className="vp-key-action__progress__container">
            <MdOutlineReplay10 />
            <span>- 10 seconds</span>
          </div>
        </div>
        <div className="vp-key-action__progress skip" ref={skipRef}>
          <div className="vp-key-action__progress__container">
            <MdOutlineForward10 />
            <span>+ 10 seconds</span>
          </div>
        </div>
      </div>
    );
  }
);

export default memo(KeyAction);
