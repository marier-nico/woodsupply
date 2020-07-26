import React, { useState, useEffect } from "react";
import { ChartArea } from "./ChartArea";
import { BurgerMenu } from "./BurgerMenu";
import {
  queryScores,
  queryCompetition,
  queryCompetitions,
  queryTeams,
  queryServers,
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
  const [servers, setServers] = useState([]);
  const [comps, setComps] = useState([]);
  const [teams, setTeams] = useState([]);
  const [selectedComp, setSelectedComp] = useState("");
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [dataSource, setDataSource] = useState("competitions"); // competitions or teams
  const [data, setData] = useState({});
  const [refreshInterval, setRefreshInterval] = useState(30 * 1000); // Interval in milliseconds
  const [refreshFunction, setRefreshFunction] = useState();

  useEffect(() => {
    const fetchComps = async () => {
      setComps(await queryCompetitions());
    };

    fetchComps();
  }, []);

  useEffect(() => {
    const fetchServers = async () => {
      setServers(await queryServers());
    };

    fetchServers();
  }, []);

  useEffect(() => {
    const fetchTeams = async () => {
      let fetchedTeams = {};
      for (const server of servers) {
        try {
          let teams_in_server = await queryTeams(server["server_url"]);
          fetchedTeams[server["server_name"]] = {
            server_url: server["server_url"],
            teams: teams_in_server,
          };
        } catch (error) {
          console.error(
            `Could not fetch teams on server ${server["server_url"]}`
          );
        }
      }
      setTeams(fetchedTeams);
    };

    fetchTeams();
  }, [servers]);

  async function handleSubmit() {
    await getData(dataSource, selectedComp, selectedTeams, comps);
    if (refreshFunction) {
      clearInterval(refreshFunction);
    }
    setRefreshFunction(
      setInterval(
        getData,
        refreshInterval,
        dataSource,
        selectedComp,
        selectedTeams,
        comps
      )
    );
  }

  async function getData(dataSource, selectedComp, selectedTeams, comps) {
    let fetchedTeams = [];
    if (dataSource === "competitions") {
      const comp = selectedComp || comps[0];
      fetchedTeams = await queryCompetition(comp);
    } else {
      fetchedTeams = selectedTeams;
    }

    let serversWithTeams = {};
    for (const team of fetchedTeams) {
      if (serversWithTeams[team["server_name"]]) {
        serversWithTeams[team["server_name"]].push(team["team_name"]);
      } else {
        serversWithTeams[team["server_name"]] = [team["team_name"]];
      }
    }

    let newData = {};
    for (const serverName of Object.keys(serversWithTeams)) {
      let serverURL = servers.find((server) => {
        console.log(server);
        return server.server_name === serverName;
      }).server_url;
      let scores = await queryScores(serversWithTeams[serverName], serverURL);

      let existingTeamNames = Object.keys(newData);
      for (const newTeamName of Object.keys(scores)) {
        if (existingTeamNames.includes(newTeamName)) {
          newData[`${newTeamName} (${serverName})`] = scores[newTeamName];
        } else {
          newData[newTeamName] = scores[newTeamName];
        }
      }
    }
    setData(newData);
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
          servers={servers}
          dataSource={dataSource}
          setDataSource={setDataSource}
          selectedComp={selectedComp}
          setSelectedComp={setSelectedComp}
          selectedTeams={selectedTeams}
          setSelectedTeams={setSelectedTeams}
          setRefreshInterval={setRefreshInterval}
          handleSubmit={handleSubmit}
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
