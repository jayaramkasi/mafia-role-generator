import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import firebase from "firebase";
import "firebase/performance";

import "./App.css";

import GameDesignPage from "./pages/GameDesignPage";
import GameManagementPage from "./pages/GameManagementPage";
import RolesPage from "./pages/RolesPage";
import HowToUsePage from "./pages/HowToUsePage";

import NavigationLinks from "./components/NavigationLinks";
import Alert from "./components/Alert";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function App() {
  const perf = firebase.performance();
  const trace = perf.trace("appLoad");
  trace.start();

  useEffect(() => {
    trace.stop();
  }, [trace]);

  return (
    <BrowserRouter>
      <Container fluid style={{ padding: "0px" }}>
        <Row>
          <Col sm={12}>
            <NavigationLinks />
          </Col>
        </Row>
        <Row>
          <Col>
            <Switch>
              <Route exact path="/" component={GameDesignPage} />
              <Route exact path="/roles" component={RolesPage} />
              <Route exact path="/game" component={GameManagementPage} />
              <Route exact path="/howtoplay" component={HowToUsePage} />
            </Switch>
          </Col>
        </Row>
        <Row
          style={{
            padding: "15px",
            backgroundColor: "#000000",
            color: "#FFFFFF"
          }}>
          <Col>Built with React.</Col>
        </Row>
      </Container>
      <Alert />
    </BrowserRouter>
  );
}

export default App;
