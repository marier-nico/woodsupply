import React, { useState, useEffect } from "react";
import { ChartArea } from "./ChartArea";
import { BurgerMenu } from "./BurgerMenu";
import {
  queryScores,
  queryCompetition,
  queryCompetitions,
  queryTeams,
} from "./utils.js";

function useWindowSize() {
  function getSize() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
}

function App() {
  try {
    (async () => {
      let stuffA = await queryScores(["team_a"]);
      let stuffB = await queryCompetition("comp_b");
      let stuffC = await queryCompetitions();
      let stuffD = await queryTeams();
      console.log(stuffA);
      console.log(stuffB);
      console.log(stuffC);
      console.log(stuffD);
    })();
  } catch (e) {
    console.error(e);
  }
  return (
    <div>
      <div
        style={{
          width: "56px",
          height: `${useWindowSize().height}px`,
          float: "left",
          backgroundColor: "#23272b",
        }}
      >
        <BurgerMenu />
      </div>
      <div
        style={{
          float: "right",
          width: useWindowSize().width - 75,
          height: useWindowSize().height,
        }}
      >
        <ChartArea
          width={useWindowSize().width - 75}
          height={useWindowSize().height}
        />
      </div>
    </div>
  );
}

export default App;
