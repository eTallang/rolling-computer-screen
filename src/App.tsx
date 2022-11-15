import React, { useState } from "react";
import css from "./App.module.scss";
import { ComputerBox } from "./ComputerBox/ComputerBox";
import { ComputerScreen } from "./ComputerScreen/ComputerScreen";

const App: React.FC = () => {
  const [speed, setSpeed] = useState(10);

  return (
    <div className={css["app-container"]}>
      <h1 className={css["title"]}>Hackerman</h1>
      <ComputerBox>
        <ComputerScreen speed={speed} />
      </ComputerBox>
    </div>
  );
};

export default App;
