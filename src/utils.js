const server_url = "http://localhost:8000";

async function queryScores(teamNames) {
  let body = JSON.stringify({ team_names: teamNames });
  let response = await fetch(`${server_url}/scores`, {
    method: "POST",
    body: body,
  });
  let data = await response.json();
  return data;
}

async function queryCompetition(competitionName) {
  let body = JSON.stringify({ competition_name: competitionName });
  let response = await fetch(`${server_url}/competition_scores`, {
    body: body,
    method: "POST",
  });
  let data = await response.json();
  return data;
}

async function queryCompetitions() {
  let response = await fetch(`${server_url}/competitions`);
  let data = await response.json();
  return data;
}

async function queryTeams() {
  let response = await fetch(`${server_url}/teams`);
  let data = await response.json();
  return data;
}

export { queryScores, queryCompetition, queryCompetitions, queryTeams };
