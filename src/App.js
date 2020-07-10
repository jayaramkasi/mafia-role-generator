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
import StopAlert from "./components/StopAlert";
import ShortToast from "./components/ShortToast";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

function App() {
  const perf = firebase.performance();
  const trace = perf.trace("appLoad");
  trace.start();

  useEffect(() => {
    trace.stop();
  }, [trace]);

  return (
    <BrowserRouter>
      <Container fluid style={{ marginTop: "60px", padding: "10px" }}>
        <NavigationLinks />

        <Switch>
          <Route exact path="/" component={GameDesignPage} />
          <Route exact path="/roles" component={RolesPage} />
          <Route exact path="/game" component={GameManagementPage} />
          <Route exact path="/howtoplay" component={HowToUsePage} />
        </Switch>
        <Row
          style={{
            padding: "15px",
            backgroundColor: "#000000",
            color: "#FFFFFF"
          }}>
          <p>Built with React. </p>
        </Row>
      </Container>
      <StopAlert />
      <ShortToast />
    </BrowserRouter>
  );
}

export default App;
