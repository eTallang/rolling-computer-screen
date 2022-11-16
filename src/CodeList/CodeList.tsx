import React, { useEffect, useState } from "react";
import { CodeLine } from "../CodeLine/CodeLine";
import css from "./CodeList.module.scss";

interface Props {
  numberOfRows: number;
  lineHeight: number;
}

let codeLineId = 0;

export const CodeList: React.FC<Props> = ({ numberOfRows, lineHeight }) => {
  const [numberOfItemsCreated, setNumberOfItemsCreated] = useState(1);
  const [code, setCode] = useState<number[]>([]);

  const addLineOfCode = (deleteFirst = false) => {
    setCode((codes) => {
      const copy = codes.slice();

      if (deleteFirst) {
        copy.splice(0, 1);
      }
      copy.push(codeLineId++);

      return copy;
    });
  };

  const addInitialCode = (): void => {
    if (numberOfItemsCreated < numberOfRows) {
      addLineOfCode();
      setNumberOfItemsCreated(() => numberOfItemsCreated + 1);
    }
  };

  useEffect(() => {
    if (code.length === 0) {
      addLineOfCode();
    }
  }, []);

  return (
    <div className={css["code-list"]}>
      {code.map((id) => (
        <CodeLine
          key={id}
          onVisible={addInitialCode}
          onHidden={() => addLineOfCode(true)}
          lineHeight={lineHeight}
        />
      ))}
    </div>
  );
};
