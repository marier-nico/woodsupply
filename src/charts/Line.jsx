import React from "react";
import { ResponsiveLine } from "@nivo/line";

const data = {
  team_a: { 1: 120, 2: 200, 3: 225, 4: 300, 5: 10000 },
  team_b: { 1: 100, 2: 150, 3: 200, 4: 240 },
  team_c: { 1: 75, 2: 90, 3: 113, 4: 180 },
  team_d: {},
};

function toSeries(data) {
  let series = [];

  for (let [teamName, teamData] of Object.entries(data)) {
    let seriesData = [];
    for (let [x, y] of Object.entries(teamData)) {
      seriesData.push({ x: x, y: y });
    }
    series.push({ id: teamName, data: seriesData });
  }

  return series;
}

function Line(props) {
  const properties = {
    margin: { top: 8, right: 5, bottom: 50, left: 80 },
    data: toSeries(data),
    colors: { scheme: "paired" },
    enableSlices: "x",
    motionStiffness: 150,
    motionDamping: 20,
    axisLeft: {
      format: ".2s",
      legend: "Cost",
      legendPosition: "middle",
      legendOffset: -50,
    },
    axisBottom: {
      legend: "Week",
      legendPosition: "middle",
      legendOffset: 32,
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

  return <ResponsiveLine {...properties} />;
}

export { Line };
