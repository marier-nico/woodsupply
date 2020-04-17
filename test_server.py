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
        "comp_a": ["team_a", "team_b"],
        "comp_b": ["team_a", "team_c"],
        "comp_c": ["team_b", "team_c"],
    },
}


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
    competition_names: List[str]


@app.post("/scores")
def query_scores(team_names: ScoresQuery) -> ScoresPerWeek:
    result = {}
    for team_name in team_names.team_names:
        if team_name in fake_db["teams"]:
            result[team_name] = fake_db["teams"][team_name]
    return result


@app.post("/competition_scores")
def query_competition_scores(competition: CompetitionQuery) -> ScoresPerWeek:
    result = {}
    if competition.competition_name in fake_db["competitions"]:
        for team_name in fake_db["competitions"][competition.competition_name]:
            result[team_name] = fake_db["teams"][team_name]
    return result


@app.get("/competitions")
def query_competitions() -> CompetitionResult:
    return list(fake_db["competitions"].keys())


@app.get("/teams")
def query_teams() -> ScoresQuery:
    return list(fake_db["teams"].keys())


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
