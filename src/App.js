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
  const [comps, setComps] = useState([]);
  const [teams, setTeams] = useState([]);
  const [selectedComp, setSelectedComp] = useState("");
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [dataSource, setDataSource] = useState("competitions"); // competitions or teams
  const [data, setData] = useState({});
  const [refreshInterval, setRefreshInterval] = useState(30 * 1000); // Interval in milliseconds
  useEffect(() => {
    const fetchCompsAndTeams = async () => {
      setComps(await queryCompetitions());
      setTeams(await queryTeams());
    };

    fetchCompsAndTeams();
  }, []);

  async function getData() {
    if (dataSource === "competitions") {
      const comp = selectedComp || comps[0];
      setData(await queryCompetition(comp));
    } else {
      setData(await queryScores(selectedTeams));
    }
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
        <BurgerMenu
          comps={comps}
          teams={teams}
          dataSource={dataSource}
          setDataSource={setDataSource}
          selectedComp={selectedComp}
          setSelectedComp={setSelectedComp}
          selectedTeams={selectedTeams}
          setSelectedTeams={setSelectedTeams}
          setRefreshInterval={setRefreshInterval}
          getData={getData}
        />
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
          chartData={data}
        />
      </div>
    </div>
  );
}

export default App;
