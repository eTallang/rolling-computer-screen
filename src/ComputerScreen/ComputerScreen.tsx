import React, { useEffect, useRef, useState } from "react";
import { CodeList } from "../CodeList/CodeList";
import css from "./ComputerScreen.module.scss";

export const ComputerScreen: React.FC = () => {
  const screenRef = useRef<HTMLDivElement>(null);
  const [numberOfRows, setNumberOfRows] = useState(0);

  useEffect(() => {
    if (screenRef.current) {
      setNumberOfRows(Math.round(screenRef.current.clientHeight / 8));
    }
  }, [screenRef, screenRef?.current]);

  return (
    <div className={css["computer-screen"]} ref={screenRef}>
      <CodeList numberOfRows={numberOfRows} />
    </div>
  );
};
