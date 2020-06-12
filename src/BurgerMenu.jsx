import React, { useState, useEffect } from "react";
import { slide as Menu } from "react-burger-menu";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { BsPlus } from "react-icons/bs";
import { AiOutlineMinus } from "react-icons/ai";
import Container from "react-bootstrap/Container";

function BurgerMenu(props) {
  const [selectedServerName, setSelectedServerName] = useState("");
  const [highlightedTeams, setHighlightedTeams] = useState([]);
  const [highlightedSelectedTeams, setHighlightedSelectedTeams] = useState([]);
  const [refreshIntervalIsInvalid, setRefreshIntervalIsInvalid] = useState(
    false
  );
  const [refreshInSecOrMin, setRefreshInSecOrMin] = useState("sec");
  const [rawRefreshInterval, setRawRefreshInterval] = useState("30");

  useEffect(() => {
    let refreshAsNumber = Number(rawRefreshInterval);
    if (Number.isNaN(refreshAsNumber)) {
      setRefreshIntervalIsInvalid(true);
    } else {
      setRefreshIntervalIsInvalid(false);
      if (refreshInSecOrMin === "sec") {
        refreshAsNumber *= 1000;
      } else {
        refreshAsNumber *= 1000 * 60;
      }
      props.setRefreshInterval(refreshAsNumber);
    }
  }, [refreshInSecOrMin, rawRefreshInterval, props]);

  useEffect(() => {
    if (props.servers[0]) {
      setSelectedServerName(props.servers[0]["server_name"]);
    } else {
      setSelectedServerName("");
    }
  }, [props.servers]);

  return (
    <Menu width={"450px"}>
      <Container>
        <Tabs
          className="selection-tabs"
          fill
          activeKey={props.dataSource}
          onSelect={(tab) => props.setDataSource(tab)}
        >
          <Tab eventKey="competitions" title="Competitions">
            {/*Competition selection*/}
            <Form>
              <Form.Group controlId="competitions.select">
                <Form.Label>Competition List</Form.Label>
                <Form.Control
                  as="select"
                  onChange={({ target }) =>
                    props.setSelectedComp(target.selectedOptions[0].innerText)
                  }
                >
                  {props.comps.map((comp) => (
                    <option key={comp}>{comp}</option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Form>
          </Tab>
          <Tab eventKey="teams" title="Manual Selection">
            {/*Manual team selection*/}
            <Form>
              <Form.Group controlId="manual.server">
                <Form.Label>Server Selection</Form.Label>
                <Form.Control
                  as="select"
                  onChange={({ target }) =>
                    setSelectedServerName(target.selectedOptions[0].innerText)
                  }
                >
                  {props.servers.map((server) => (
                    <option key={server["server_name"]}>
                      {server["server_name"]}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="manual.selection">
                <Form.Label>Available Teams</Form.Label>
                <Form.Control
                  as="select"
                  multiple
                  onChange={({ target }) =>
                    setHighlightedTeams(Array.from(target.selectedOptions))
                  }
                  style={{height: "300px"}}
                >
                  {(props.teams[selectedServerName] || { teams: [] })[
                    "teams"
                  ].map((team_name) => (
                    <option data-servername={selectedServerName} key={team_name}>
                      {team_name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group
                controlId="manual.addRemove"
                className="text-center"
                as={Row}
              >
                <Col sm="6">
                  <Button
                    variant="outline-success"
                    onClick={() => {
                      let teams = highlightedTeams.map((option) => ({
                        server_name: option.getAttribute("data-servername"),
                        team_name: option.innerText,
                      }));
                      props.setSelectedTeams(
                        Array.from(
                          // This big filter just ensures that no duplicates are added
                          props.selectedTeams
                            .concat(teams)
                            .filter(
                              (team, index, self) =>
                                index ===
                                self.findIndex(
                                  (t) =>
                                    t.server_name === team.server_name &&
                                    t.team_name === team.team_name
                                )
                            )
                        )
                      );
                    }}
                  >
                    <BsPlus />
                  </Button>
                </Col>
                <Col sm="6">
                  <Button
                    variant="outline-danger"
                    onClick={() => {
                      props.setSelectedTeams(
                        props.selectedTeams.filter(
                          (elm) =>
                            !highlightedSelectedTeams.some(
                              (highlightedSelectedTeam) =>
                                highlightedSelectedTeam.server_name ===
                                  elm.server_name &&
                                highlightedSelectedTeam.team_name ===
                                  elm.team_name
                            )
                        )
                      );
                    }}
                  >
                    <AiOutlineMinus />
                  </Button>
                </Col>
              </Form.Group>
              <Form.Group>
                <Form.Label>Selected Teams</Form.Label>
                <Form.Control
                  as="select"
                  multiple
                  id="selectedTeams"
                  onChange={({ target }) => {
                    let teams = Array.from(target.selectedOptions).map(
                      (option) => ({
                        server_name: option.getAttribute("data-servername"),
                        team_name: option.innerText,
                      })
                    );
                    setHighlightedSelectedTeams(teams);
                  }}
                >
                  {props.selectedTeams.map((team) => (
                    <option
                      data-servername={team["server_name"]}
                      key={`${team["server_name"]}-${team["team_name"]}`}
                    >
                      {team["team_name"]}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Form>
          </Tab>
        </Tabs>
        <hr />
        <Form>
          {/*Other options*/}
          <Form.Group as={Row} controlId="refresh">
            <Form.Label column sm="5">
              Refresh every
            </Form.Label>
            <Col sm="4">
              <Form.Control
                defaultValue="30"
                isInvalid={refreshIntervalIsInvalid}
                onChange={({ target }) => setRawRefreshInterval(target.value)}
              />
            </Col>
            <Col sm="3">
              <Form.Control
                as="select"
                onChange={({ target }) =>
                  setRefreshInSecOrMin(target.selectedOptions[0].innerText)
                }
              >
                <option>sec</option>
                <option>min</option>
              </Form.Control>
            </Col>
          </Form.Group>
          <Form.Group>
            <Button variant="dark" block onClick={() => props.handleSubmit()}>
              Submit
            </Button>
          </Form.Group>
        </Form>
      </Container>
    </Menu>
  );
}

export { BurgerMenu };
