import React from "react";
import Table from "react-bootstrap/Table";

function getTableElements(data) {
  let rows = [];

  for (let [teamName, teamData] of Object.entries(data)) {
    const totalCost = Object.values(teamData)[Object.values(teamData).length - 1];
    const averageCost = totalCost / (Object.values(teamData).length - 1) || 0;
    const currentWeek =
      Object.keys(teamData)[Object.keys(teamData).length - 1] || 0;

    rows.push(
      <tr key={teamName}>
        <td>{teamName}</td>
        <td>{averageCost.toFixed(2)}</td>
        <td>{totalCost.toFixed(2)}</td>
        <td>{currentWeek}</td>
      </tr>
    );
  }

  return rows;
}

function ScoresTable(props) {
  return (
    <Table responsive striped bordered hover variant="dark" size="sm">
      <thead>
        <tr>
          <th>Team Name</th>
          <th>Avg. Cost</th>
          <th>Tot. Cost</th>
          <th>Week</th>
        </tr>
      </thead>
      <tbody>{getTableElements(props.data)}</tbody>
    </Table>
  );
}

export { ScoresTable };
