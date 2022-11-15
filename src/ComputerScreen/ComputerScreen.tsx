import React, { useEffect, useRef, useState } from "react";
import { CodeList } from "../CodeList/CodeList";
import { ScreenFlicker } from "../ScreenFlicker/ScreenFlicker";
import css from "./ComputerScreen.module.scss";

interface Props {
  speed: number;
}

export const ComputerScreen: React.FC<Props> = ({ speed }) => {
  const screenRef = useRef<HTMLDivElement>(null);
  const [numberOfRows, setNumberOfRows] = useState(0);

  useEffect(() => {
    if (screenRef.current) {
      setNumberOfRows(Math.round(screenRef.current.clientHeight / 16));
    }
  }, [screenRef, screenRef?.current]);

  return (
    <div className={css["computer-screen"]} ref={screenRef}>
      <CodeList numberOfRows={numberOfRows} speed={speed} />
    </div>
  );
};
