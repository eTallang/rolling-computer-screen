import React, { useEffect, useRef, useState } from "react";
import { CodeLine } from "./CodeLine";
import css from "./ComputerScreen.module.scss";

const BROKEN_MODE = false;

let lastTimeStamp = 0;
const fps = 30;
const lineHeight = 10;
const padding = 30;

interface ScreenDimensions {
  width: number;
  height: number;
}

export const ComputerScreen: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const [screenDimensions, setScreenDimensions] = useState<ScreenDimensions>({
    width: 0,
    height: 0,
  });

  const createCodeLine = (context: CanvasRenderingContext2D): CodeLine => {
    return new CodeLine(
      context,
      screenDimensions.height + (lineHeight + padding) * 1.4,
      lineHeight,
      screenDimensions.width,
      BROKEN_MODE
    );
  };

  const render = (
    ctx: CanvasRenderingContext2D,
    lines: CodeLine[],
    timestamp?: number
  ): void => {
    window.requestAnimationFrame((time) => render(ctx, lines, time));

    if (timestamp && timestamp - lastTimeStamp > 1000 / fps) {
      lastTimeStamp = timestamp;
      if (BROKEN_MODE) {
        ctx.fillStyle = "rgb(0 0 0 / 0.2)";
        ctx.fillRect(0, 0, screenDimensions.width, screenDimensions.width);
      } else {
        ctx.clearRect(0, 0, screenDimensions.width, screenDimensions.width);
      }
      if (lines[0].isOutOfBounds()) {
        lines.splice(0, 1);
        lines.push(createCodeLine(ctx));
      }
      lines.forEach((codeLine) => codeLine.update());
    }
  };

  const createCodeLineList = (ctx: CanvasRenderingContext2D): CodeLine[] => {
    const count =
      Math.round(screenDimensions.height / (lineHeight + padding)) + 1;
    return new Array(count)
      .fill("")
      .map(
        (_, index) =>
          new CodeLine(
            ctx,
            (index + 1) * (lineHeight + padding),
            lineHeight,
            screenDimensions.width,
            BROKEN_MODE
          )
      );
  };

  const observeResizing = (el: HTMLElement | null): ResizeObserver => {
    const observer = new ResizeObserver((ev) => {
      setScreenDimensions({
        width: ev[0].contentRect.width - 32,
        height: ev[0].contentRect.height,
      });
    });

    if (el) {
      observer.observe(el);
    }

    return observer;
  };

  useEffect(() => {
    const observer = observeResizing(screenRef.current);
    return () => observer && observer.disconnect();
  }, [screenRef?.current]);

  useEffect(() => {
    const context = canvasRef.current?.getContext("2d");
    if (context && screenDimensions.height && screenDimensions.width) {
      const lines = createCodeLineList(context);
      render(context, lines);
    }
  }, [screenDimensions]);

  return (
    <div className={css["computer-screen"]} ref={screenRef}>
      <canvas
        ref={canvasRef}
        width={screenDimensions.width}
        height={screenDimensions.height}
        className={`${BROKEN_MODE ? css["broken-screen"] : ""}`}
      />
    </div>
  );
};
