from typing import List, Dict

import uvicorn
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from pydantic import BaseModel


app = FastAPI()
app.add_middleware(
    CORSMiddleware, allow_origins=["http://localhost:3000"], allow_methods=["*"]
)

fake_db = {
    "teams": {
        "team_a": {1: 120, 2: 200, 3: 225, 4: 300},
        "team_b": {1: 100, 2: 150, 3: 200, 4: 240},
        "team_c": {1: 75, 2: 90, 3: 113, 4: 180},
    },
    "competitions": {
        "comp_a": [
            {"server_name": "server_a", "team_name": "team_a"},
            {"server_name": "server_a", "team_name": "team_b"},
        ],
        "comp_b": [
            {"server_name": "server_b", "team_name": "team_a"},
            {"server_name": "server_c", "team_name": "team_c"},
        ],
        "comp_c": [
            {"server_name": "server_b", "team_name": "team_b"},
            {"server_name": "server_a", "team_name": "team_c"},
        ],
    },
    "servers": {
        "server_a": "http://localhost:8000/",
        "server_b": "http://localhost:8000/",
        "server_c": "http://localhost:8000/",
    },
}


class Server(BaseModel):
    server_name: str
    server_url: str


class Team(BaseModel):
    team_name: str
    server_name: str


class ScoresQuery(BaseModel):
    team_names: List[str]


class ScoresPerWeek(BaseModel):
    """Return scores in this format

    Team names map to the total cost for each week.
    {"team_name": {1: 100, 2: 200, ...}, "other_team": {1: 40, 2: 80, ...}, ...}
    """

    scores: Dict[str, Dict[int, int]]


class CompetitionQuery(BaseModel):
    competition_name: str


class CompetitionResult(BaseModel):
    teams: List[Team]


class CompetitionsResult(BaseModel):
    competitions: List[str]


class ServersResult(BaseModel):
    servers: List[Server]


@app.post("/scores/")
def query_scores(team_names: ScoresQuery) -> ScoresPerWeek:
    result = {}
    for team_name in team_names.team_names:
        if team_name in fake_db["teams"]:
            result[team_name] = fake_db["teams"][team_name]
    return ScoresPerWeek(scores=result)


@app.post("/competition_teams/")
def query_competition_teams(competition: CompetitionQuery) -> CompetitionResult:
    result = []
    if competition.competition_name in fake_db["competitions"]:
        result = [
            Team(team_name=team["team_name"], server_name=team["server_name"])
            for team in fake_db["competitions"][competition.competition_name]
        ]
    return CompetitionResult(teams=result)


@app.get("/competitions/")
def query_competitions() -> CompetitionsResult:
    return CompetitionsResult(competitions=list(fake_db["competitions"].keys()))


@app.get("/teams/")
def query_teams() -> ScoresQuery:
    return ScoresQuery(team_names=list(fake_db["teams"].keys()))


@app.get("/servers/")
def query_servers() -> ServersResult:
    return ServersResult(
        servers=[
            Server(server_name=server_name, server_url=server_url)
            for server_name, server_url in fake_db["servers"].items()
        ]
    )


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
