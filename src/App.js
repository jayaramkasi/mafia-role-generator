import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Grid } from "@material-ui/core";

import firebase from "firebase";
import "firebase/performance";

import "./App.css";
import HomePage from "./pages/HomePage";
import GameDesignPage from "./pages/GameDesignPage";
import GameManagementPage from "./pages/GameManagementPage";
import RolesPage from "./pages/RolesPage";

function App() {
  const perf = firebase.performance();
  const trace = perf.trace("appLoad");
  trace.start();

  useEffect(() => {
    trace.stop();
  }, []);

  return (
    <BrowserRouter>
      <Grid className="App" container direction="column" alignItems="center">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/roles" component={RolesPage} />
          <Route exact path="/design" component={GameDesignPage} />
          <Route exact path="/game" component={GameManagementPage} />
        </Switch>
      </Grid>
    </BrowserRouter>
  );
}

export default App;
