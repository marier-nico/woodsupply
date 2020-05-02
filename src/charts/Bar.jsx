import React from "react";
import { ResponsiveBar } from "@nivo/bar";

const data = {
  team_a: { 1: 120, 2: 200, 3: 225, 4: 300 },
  team_b: { 1: 100, 2: 150, 3: 200, 4: 240 },
  team_c: { 1: 75, 2: 90, 3: 113, 4: 180 },
  team_d: {},
};

function toSeries(data) {
  let series = [];

  for (let [teamName, teamData] of Object.entries(data)) {
    const totalCost = Object.values(teamData).reduce((a, b) => a + b, 0);
    const averageCost = totalCost / Object.values(teamData).length || 0;
    series.push({ teamName: teamName, averageCost: averageCost });
  }

  return series;
}

function Bar(props) {
  const properties = {
    margin: { top: 5, right: 5, bottom: 50, left: 45 },
    data: toSeries(data),
    colors: { scheme: "paired" },
    enableGridX: true,
    enableGridY: false,
    layout: "horizontal",
    keys: ["averageCost"],
    indexBy: "teamName",
    axisBottom: {
      legend: "Average Cost",
      legendPosition: "middle",
      legendOffset: 32,
    },
    axisLeft: {
      legend: "Team Name",
      legendPosition: "middle",
      legendOffset: -40,
      tickSize: 0,
      tickPadding: 15,
      tickRotation: -90,
    },
    theme: {
      axis: {
        ticks: {
          text: {
            fill: "white",
          },
        },
        legend: {
          text: {
            fill: "white",
          },
        },
      },
    },
  };

  return <ResponsiveBar {...properties} />;
}

export { Bar };
