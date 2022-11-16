import React, { useEffect, useRef, useState } from "react";
import { CodeFragment } from "../CodeFragment/CodeFragment";
import css from "./CodeLine.module.scss";

interface Props {
  lineHeight: number;
  onVisible: () => void;
  onHidden: () => void;
}

export const CodeLine: React.FC<Props> = ({
  lineHeight,
  onVisible,
  onHidden,
}) => {
  const lineRef = useRef<HTMLDivElement>(null);
  const [lineParts, setLineParts] = useState<number[]>([]);

  const createLineParts = (): number[] => {
    let noOfItems = 6 + Math.round(Math.random() * 3);
    if (noOfItems % 2 === 0) {
      noOfItems++;
    }

    const list = new Array(noOfItems).fill(1).map((_, index) => {
      if (index === 0 || index === noOfItems - 1) {
        return 1 + Math.random() * 4;
      }
      return 1 + Math.random() * (index % 2 === 0 ? 1 : 8);
    });

    return list;
  };

  const createIntersectionObserver = (
    line: HTMLDivElement
  ): IntersectionObserver => {
    let hasBeenVisible = false;

    const onChange = (ev: IntersectionObserverEntry[]): void => {
      if (ev[0].intersectionRatio === 1) {
        hasBeenVisible = true;
        onVisible();
      } else if (ev[0].intersectionRatio === 0 && hasBeenVisible) {
        onHidden();
      }
    };
    const observer = new IntersectionObserver(onChange, { threshold: [0, 1] });
    observer.observe(line);

    return observer;
  };

  useEffect(() => {
    const line = lineRef?.current;
    let observer: IntersectionObserver;
    if (line) {
      observer = createIntersectionObserver(line);
    }

    return () => observer.disconnect();
  }, [lineRef?.current]);

  useEffect(() => {
    setLineParts(createLineParts());
  }, []);

  return (
    <div
      className={css["line-container"]}
      ref={lineRef}
      style={{ height: `${lineHeight}px` }}
    >
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
