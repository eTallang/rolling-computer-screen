import React, { useEffect, useRef, useState } from "react";

import css from "./ScreenFlicker.module.scss";

export const ScreenFlicker: React.FC = () => {
  const [failedChances, setFailedChances] = useState(0);
  const [isShowing, setIsShowing] = useState(false);

  useEffect(() => {
    if (isShowing) {
      setTimeout(() => setIsShowing(false), Math.random() * 600 + 100);
    }
  }, [isShowing]);

  useEffect(() => {
    setInterval(() => {
      if (Math.random() * 10 + failedChances > 9 && !isShowing) {
        setIsShowing(true);
      } else {
        setFailedChances(failedChances + 1);
      }
    }, 500);
  }, []);

  return <>{isShowing && <div className={css["flicker"]} />}</>;
};
