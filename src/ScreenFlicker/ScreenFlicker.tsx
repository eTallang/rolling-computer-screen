import React from "react";
import { useProbability } from "../hooks/useProbability";

import css from "./ScreenFlicker.module.scss";

export const ScreenFlicker: React.FC = () => {
  const isShowing = useProbability(20);

  return <>{isShowing && <div className={css["flicker"]} />}</>;
};
