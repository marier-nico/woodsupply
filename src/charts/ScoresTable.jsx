import React from "react";
import Table from "react-bootstrap/Table";

const data = {
  team_a: { 1: 120, 2: 200, 3: 225, 4: 300 },
  team_b: { 1: 100, 2: 150, 3: 200, 4: 240 },
  team_c: { 1: 75, 2: 90, 3: 113, 4: 180 },
  team_d: {},
};

function getTableElements(data) {
  let rows = [];

  for (let [teamName, teamData] of Object.entries(data)) {
    const totalCost = Object.values(teamData).reduce((a, b) => a + b, 0);
    const averageCost = totalCost / Object.values(teamData).length || 0;
    const currentWeek =
      Object.keys(teamData)[Object.keys(teamData).length - 1] || 0;

    rows.push(
      <tr key={teamName}>
        <td>{teamName}</td>
        <td>{averageCost}</td>
        <td>{totalCost}</td>
        <td>{currentWeek}</td>
      </tr>
    );
  }

  return rows;
}

function ScoresTable(props) {
  return (
    <Table striped bordered hover variant="dark" size="sm">
      <thead>
        <tr>
          <th>Team Name</th>
          <th>Avg. Cost</th>
          <th>Tot. Cost</th>
          <th>Week</th>
        </tr>
      </thead>
      <tbody>{getTableElements(data)}</tbody>
    </Table>
  );
}

export { ScoresTable };
