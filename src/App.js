import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";

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
  return (
    <HashRouter basename="/">
      <Container
        fluid
        style={{
          marginTop: "60px",
          padding: "0px 10px 0px 20px",
          minHeight: "100%"
        }}>
        <NavigationLinks />

        <Switch>
          <Route exact path="/roles" component={RolesPage} />
          <Route exact path="/game" component={GameManagementPage} />
          <Route exact path="/howtoplay" component={HowToUsePage} />
          <Route exact path="/*" component={GameDesignPage} />
        </Switch>
        <Row
          style={{
            padding: "15px",
            backgroundColor: "#000000",
            color: "#FFFFFF",
            bottom: "0"
          }}>
          <p>Built with React. </p>
        </Row>
      </Container>
      <StopAlert />
      <ShortToast />
    </HashRouter>
  );
}

export default App;
