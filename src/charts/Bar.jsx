import React from "react";
import { ResponsiveBar } from "@nivo/bar";

function toSeries(data) {
  let series = [];

  for (let [teamName, teamData] of Object.entries(data)) {
    const totalCost = Object.values(teamData)[Object.values(teamData).length - 1];
    const averageCost = totalCost / (Object.values(teamData).length - 1) || 0;
    series.push({ teamName: teamName, averageCost: averageCost.toFixed(2) });
  }

  return series;
}

function Bar(props) {
  const properties = {
    margin: { top: 5, right: 5, bottom: 50, left: 50 },
    data: toSeries(props.data),
    colors: { scheme: "nivo" },
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
      legendOffset: -45,
      tickSize: 0,
      tickPadding: 15,
      tickRotation: -80,
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
