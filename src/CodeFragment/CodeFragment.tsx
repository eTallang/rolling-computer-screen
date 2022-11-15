import React from "react";
import { useProbability } from "../hooks/useProbability";
import css from "./CodeFragment.module.scss";

interface Props {
  flex: number;
}

export const CodeFragment: React.FC<Props> = ({ flex }) => {
  const isActive = useProbability(10);

  return (
    <div
      className={`${css["code-fragment"]} ${isActive ? css["active"] : ""}`}
      style={{ flex: flex }}
    ></div>
  );
};
