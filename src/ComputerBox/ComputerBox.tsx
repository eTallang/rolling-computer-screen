import React from "react";
import { ScreenFlicker } from "../ScreenFlicker/ScreenFlicker";
import css from "./ComputerBox.module.scss";

interface Props {
  children: React.ReactNode;
}

export const ComputerBox: React.FC<Props> = ({ children }) => {
  return (
    <>
      <div className={css["computer-box"]}>
        <div className={css["shadow"]}></div>
        <div className={css["computer-content"]}>
          {children}
          <ScreenFlicker />
        </div>
      </div>
    </>
  );
};
