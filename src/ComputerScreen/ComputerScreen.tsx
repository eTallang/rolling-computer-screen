import React, { useEffect, useRef, useState } from "react";
import { CodeLine } from "./CodeLine";
import css from "./ComputerScreen.module.scss";

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
      screenDimensions.height + (lineHeight + padding) * 1,
      lineHeight,
      screenDimensions.width
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
      ctx?.clearRect(0, 0, screenDimensions.width, screenDimensions.width);
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
            screenDimensions.width
          )
      );
  };

  useEffect(() => {
    if (screenRef.current) {
      setScreenDimensions({
        width: screenRef.current.clientWidth - 32,
        height: screenRef.current.clientHeight,
      });
    }
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
      />
    </div>
  );
};
