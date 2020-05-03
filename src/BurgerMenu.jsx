import React, { useState } from "react";
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

const data = ["team_a", "team_b", "team_c", "team_d"];

function BurgerMenu(props) {
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [highlightedTeams, setHighlightedTeams] = useState([]);
  const [highlightedSelectedTeams, setHighlightedSelectedTeams] = useState([]);

  return (
    <Menu width={"450px"}>
      <Container>
        <Tabs className="selection-tabs" fill defaultActiveKey="competitions">
          <Tab eventKey="competitions" title="Competitions">
            {/*Competition selection*/}
            <Form>
              <Form.Group controlId="competitions.select">
                <Form.Label>Competition List</Form.Label>
                <Form.Control as="select">
                  {data.map((comp) => (
                    <option key={comp}>{comp}</option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Form>
          </Tab>
          <Tab eventKey="teamSelect" title="Manual Selection">
            {/*Manual team selection*/}
            <Form>
              <Form.Group controlId="manual.server">
                <Form.Label>Server Selection</Form.Label>
                <Form.Control as="select">
                  <option>Canada</option>
                  <option>Europe</option>
                  <option>Asia</option>
                  <option>Bot</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="manual.selection">
                <Form.Label>Available Teams</Form.Label>
                <Form.Control
                  as="select"
                  multiple
                  onChange={({ target }) =>
                    setHighlightedTeams(
                      Array.from(target.selectedOptions).map(
                        (option) => option.innerText
                      )
                    )
                  }
                >
                  {data.map((team) => (
                    <option key={team}>{team}</option>
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
                    onClick={() =>
                      setSelectedTeams(
                        Array.from(
                          new Set(selectedTeams.concat(highlightedTeams))
                        )
                      )
                    }
                  >
                    <BsPlus />
                  </Button>
                </Col>
                <Col sm="6">
                  <Button
                    variant="outline-danger"
                    onClick={() => {
                      setSelectedTeams(
                        selectedTeams.filter(
                          (elm) => !highlightedSelectedTeams.includes(elm)
                        )
                      );
                    }}
                  >
                    <AiOutlineMinus />
                  </Button>
                </Col>
              </Form.Group>
              <Form.Group controlId="manual.selected">
                <Form.Label>Selected Teams</Form.Label>
                <Form.Control
                  as="select"
                  multiple
                  id="selectedTeams"
                  onChange={({ target }) => {
                    console.log(target);
                    setHighlightedSelectedTeams(
                      Array.from(target.selectedOptions).map(
                        (option) => option.innerText
                      )
                    );
                  }}
                >
                  {selectedTeams.map((team) => (
                    <option key={team}>{team}</option>
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
            <Col sm="3">
              <Form.Control defaultValue="30" />
            </Col>
            <Col sm="4">
              <Form.Control as="select">
                <option>sec</option>
                <option>min</option>
              </Form.Control>
            </Col>
          </Form.Group>
          <Form.Group controlId="select.submit">
            <Button variant="dark" block>
              Submit
            </Button>
          </Form.Group>
        </Form>
      </Container>
    </Menu>
  );
}

export { BurgerMenu };
