import React, { useEffect, useState } from "react";
import { CodeFragment } from "../CodeFragment/CodeFragment";
import css from "./CodeLine.module.scss";

export const CodeLine: React.FC = () => {
  const [lineParts, setLineParts] = useState<number[]>([]);

  useEffect(() => {
    const noOfItems = 6 + Math.round(Math.random() * 3);
    let list = new Array(noOfItems).fill(1);
    list = list.map((_, index) => {
      if (index === 0 || index == noOfItems - 1) {
        return Math.random() * 7;
      }
      return 1 + Math.random() * (index % 2 === 0 ? 1 : 8);
    });
    setLineParts(list);
  }, []);

  return (
    <div className={css["line-container"]}>
      {lineParts.map((part, index) =>
        index % 2 === 0 ? (
          <div key={index} style={{ flex: part }} />
        ) : (
          <CodeFragment key={index} flex={part} />
        )
      )}
    </div>
  );
};
