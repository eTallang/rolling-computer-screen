import React from "react";
import css from "./SpeedSlider.module.scss";

interface Props {
  speed: number;
  onSpeedChange: (speed: number) => void;
}

export const SpeedSlider: React.FC<Props> = ({ speed, onSpeedChange }) => {
  const onChange = (ev: React.ChangeEvent<HTMLInputElement>): void => {
    onSpeedChange(+ev.target.value);
  };

  return (
    <label className={css["slider"]}>
      <span>Speed</span>
      <input min={0} max={100} type="range" value={speed} onChange={onChange} />
    </label>
  );
};
