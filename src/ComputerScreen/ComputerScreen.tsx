import React, { useEffect, useRef, useState } from "react";
import { CodeList } from "../CodeList/CodeList";
import css from "./ComputerScreen.module.scss";

export const ComputerScreen: React.FC = () => {
  const lineHeight = 32;
  const screenRef = useRef<HTMLDivElement>(null);
  const [numberOfRows, setNumberOfRows] = useState(0);

  useEffect(() => {
    if (screenRef.current) {
      setNumberOfRows(Math.round(screenRef.current.clientHeight / lineHeight));
    }
  }, [screenRef, screenRef?.current]);

  return (
    <div className={css["computer-screen"]} ref={screenRef}>
      <CodeList numberOfRows={numberOfRows} lineHeight={lineHeight}/>
    </div>
  );
};
