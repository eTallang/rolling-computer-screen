import React, { useEffect, useRef, useState } from "react";
import { CodeLine } from "../CodeLine/CodeLine";
import css from "./CodeList.module.scss";

interface Props {
  numberOfRows: number;
}

let codeLineId = 0;

export const CodeList: React.FC<Props> = ({ numberOfRows }) => {
  const [timeoutId, setTimeoutId] = useState<number>();
  const listRef = useRef<HTMLDivElement>(null);
  const [code, setCode] = useState<number[]>([]);

  const hasReachedScrollBottom = (el: HTMLDivElement): boolean => {
    return el.scrollHeight - (el.scrollTop + el.clientHeight) < 80;
  };

  const onScroll = (): void => {
    if (listRef.current && hasReachedScrollBottom(listRef.current)) {
      const codeListCopy = code.slice();
      codeListCopy.splice(0, 1);
      codeListCopy.push(...new Array(1).fill(0).map(() => codeLineId++));
      setCode(codeListCopy);
    }
  };

  useEffect(() => {
    const list = new Array(numberOfRows).fill(0).map(() => codeLineId++);
    setCode([...list]);
  }, [numberOfRows]);

  useEffect(() => {
    const listEl = listRef.current;

    if (listEl) {
      if (timeoutId) {
        listEl.scrollTo({ top: 0 });
        window.clearInterval(timeoutId);
      }

      const id = setInterval(() => listEl.scrollBy({ top: 1 }), 40);
      setTimeoutId(id);
    }
  }, [listRef, listRef?.current]);

  return (
    <div ref={listRef} className={css["code-list"]} onScroll={onScroll}>
      {code.map((id) => <CodeLine key={id} />)}
    </div>
  );
};
