import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Grid, Typography } from "@material-ui/core";

import firebase from "firebase";
import "firebase/performance";

import "./App.css";
import HomePage from "./pages/HomePage";
import GameDesignPage from "./pages/GameDesignPage";
import GameManagementPage from "./pages/GameManagementPage";
import RolesPage from "./pages/RolesPage";
import HowToUsePage from "./pages/HowToUsePage";

function App() {
  const perf = firebase.performance();
  const trace = perf.trace("appLoad");
  trace.start();

  useEffect(() => {
    trace.stop();
  }, [trace]);

  return (
    <BrowserRouter>
      <Grid
        className="App"
        container
        direction="column"
        alignItems="center"
        style={{ minHeight: "100%" }}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/roles" component={RolesPage} />
          <Route exact path="/design" component={GameDesignPage} />
          <Route exact path="/game" component={GameManagementPage} />
          <Route exact path="/howtoplay" component={HowToUsePage} />
        </Switch>
      </Grid>
      <Grid
        container
        style={{
          bottom: "0",
          backgroundColor: "#000000",
          color: "#FFF",
          padding: "15px"
        }}>
        <Typography variant="caption">Built with React.</Typography>
      </Grid>
    </BrowserRouter>
  );
}

export default App;
