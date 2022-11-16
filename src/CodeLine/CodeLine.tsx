import React, { useEffect, useState } from "react";
import { CodeFragment } from "../CodeFragment/CodeFragment";
import css from "./CodeLine.module.scss";

export const CodeLine: React.FC = () => {
  const [lineParts, setLineParts] = useState<number[]>([]);

  const createLineParts = (): number[] => {
    let noOfItems = 6 + Math.round(Math.random() * 3);
    if (noOfItems % 2 === 0) {
      noOfItems++;
    }

    const list = new Array(noOfItems).fill(1).map((_, index) => {
      if (index === 0 || index === noOfItems - 1) {
        return 0.2 + Math.random() * 10;
      }
      return 1 + Math.random() * (index % 2 === 0 ? 1 : 8);
    });

    return list;
  };

  useEffect(() => {
    setLineParts(createLineParts());
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
