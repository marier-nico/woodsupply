import React from "react";
import GridLayout from "react-grid-layout";
import { Line } from "./charts/Line.jsx";
import { ScoresTable } from "./charts/ScoresTable";
import { Bar } from "./charts/Bar";

function ChartArea(props) {
  const layout = [
    { i: "lineChart", x: 3, y: 0, w: 9, h: 4 },
    { i: "table", x: 0, y: 0, w: 3, h: 1 },
    { i: "barChart", x: 0, y: 1, w: 3, h: 3 },
  ];

  return (
    <GridLayout
      className="layout"
      layout={layout}
      cols={12}
      rowHeight={(props.height - 50) / 4}
      width={props.width - 10}
    >
      <div key="lineChart">
        <h1 style={{ height: "4%", marginBottom: "4%" }}>Cost per week</h1>
        <div style={{ height: "90%" }}>
          <Line data={props.chartData} />
        </div>
      </div>
      <div key="table">
        <ScoresTable data={props.chartData} />
      </div>
      <div key="barChart">
        <Bar data={props.chartData} />
      </div>
    </GridLayout>
  );
}

export { ChartArea };
