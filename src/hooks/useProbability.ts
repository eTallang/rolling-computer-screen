import { useEffect, useState } from "react";

export const useProbability = (probability: number): boolean => {
  let timeoutId = 0;
  const [isHit, setIsHit] = useState(false);

  useEffect(() => {
    if (isHit) {
      setTimeout(() => setIsHit(false), Math.random() * 1000 + 50);
    }
  }, [isHit]);

  useEffect(() => {
    let failedChances = 0;
    const ratio = 1000;
    if (timeoutId) {
      clearInterval(timeoutId);
    }

    const id = setInterval(() => {
      if (
        Math.random() * ratio + failedChances >
          ratio - probability / (100 / ratio) + probability &&
        !isHit
      ) {
        setIsHit(true);
      } else {
        failedChances++;
      }
    }, 1000);
    timeoutId = id;
  }, []);

  return isHit;
};
