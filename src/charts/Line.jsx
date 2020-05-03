import React from "react";
import { ResponsiveLine } from "@nivo/line";

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
    margin: { top: 8, right: 100, bottom: 50, left: 80 },
    data: toSeries(props.data),
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

  return (
    <ResponsiveLine
      {...properties}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 90,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
        },
      ]}
    />
  );
}

export { Line };
