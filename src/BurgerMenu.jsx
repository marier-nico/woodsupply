import React from "react";
import { slide as Menu } from "react-burger-menu";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Container from "react-bootstrap/Container";

function BurgerMenu(props) {
  return (
    <Menu width={"450px"}>
      <Container>
        <Tabs className="selection-tabs" fill defaultActiveKey="competitions">
          <Tab eventKey="competitions" title="Competitions">
            <p>Competition stuff</p>
          </Tab>
          <Tab eventKey="teamSelect" title="Manual Selection">
            <p>Manual team stuff</p>
          </Tab>
        </Tabs>
      </Container>
    </Menu>
  );
}

export { BurgerMenu };
