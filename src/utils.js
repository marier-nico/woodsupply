const server_url = "http://localhost:8000/";

async function queryScores(teamNames, serverUrl) {
  let body = JSON.stringify({ team_names: teamNames });
  let response = await fetch(`${serverUrl}scores`, {
    method: "POST",
    body: body,
  });
  let data = await response.json();
  return data.scores;
}

async function queryCompetition(competitionName) {
  let body = JSON.stringify({ competition_name: competitionName });
  let response = await fetch(`${server_url}competition_teams`, {
    body: body,
    method: "POST",
  });
  let data = await response.json();
  return data.teams;
}

async function queryCompetitions() {
  let response = await fetch(`${server_url}competitions`);
  let data = await response.json();
  return data.competitions;
}

async function queryTeams(server_url) {
  let response = await fetch(`${server_url}teams`);
  let data = await response.json();
  return data.team_names;
}

async function queryServers() {
  let response = await fetch(`${server_url}servers`)
  let data = await response.json()
  return data.servers;
}

export { queryScores, queryCompetition, queryCompetitions, queryTeams, queryServers };
