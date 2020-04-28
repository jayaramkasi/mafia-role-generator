import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import {
  Grid,
  Typography,
  IconButton,
  TextField,
  Button,
  Paper,
} from "@material-ui/core";

import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import CancelIcon from "@material-ui/icons/Cancel";

import roleDescriptions from "./roleDescriptions.json";

import firebase from "firebase";
import "firebase/performance";

import "./App.css";
import HomePage from "./pages/HomePage";
import GameDesignPage from "./pages/GameDesignPage";

//Shuffle an array (stackoverflow)
function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

function App() {
  const perf = firebase.performance();
  const trace = perf.trace("appLoad");
  trace.start();
  const [mafiaRoles, setMafiaRoles] = useState({
    kamikaze: 0,
    framer: 0,
    silencer: 0,
    godfather: 0,
    mafia: 1,
  });
  const [villageRoles, setVillageRoles] = useState({
    idiot: 0,
    deputy: 0,
    granny: 0,
    creep: 0,
    gravedigger: 0,
    sniper: 0,
    bulletproof: 0,
    doc: 1,
    cop: 1,
    villager: 1,
    twins: 0,
  });

  const [playerNames, setPlayerNames] = useState([]);
  const [allocation, setAllocation] = useState([]);

  const mafiaCount = Object.values(mafiaRoles).reduce(
      (sum, value) => sum + value,
      0
    ),
    villagerCount = Object.values(villageRoles).reduce(
      (sum, value) => sum + value,
      0
    );

  const players = mafiaCount + villagerCount;

  const allRoles = { ...mafiaRoles, ...villageRoles };

  const availableRoles = Object.entries(allRoles)
    .filter(([role, count]) => count > 0)
    .reduce((roleArray, [role, count]) => {
      for (let i = 0; i < count; i++) roleArray.push(role);
      return roleArray;
    }, []);

  const uniqueAvailableRoles = [...new Set(availableRoles)];

  useEffect(() => {
    trace.stop();
  }, []);

  const aliveAllocation = allocation.filter((role) => role.alive);

  const mafiaAlive = aliveAllocation.filter((role) => role.type === "M").length,
    villageAlive = aliveAllocation.filter(
      (role) => role.type !== "M" && role.allotedRole !== "idiot"
    ).length;

  return (
    <BrowserRouter>
      <Grid className="App" container direction="column" alignItems="center">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/design" component={GameDesignPage} />
        </Switch>
        {/*<Typography variant="h2">Mafia role allocator</Typography>
      <Grid
        container
        direction="row"
        justify="space-around"
        align-items="flex-start">
        <Grid item className="three-column">
          <Typography variant="h4">Roles</Typography>
          <Typography variant="caption">
            Click on individual role name to read description (popup)
          </Typography>
          <Grid
            container
            className="roles"
            direction="column"
            alignItems="flex-start">
            <Grid item>
              <Typography variant="h5">Mafia roles ({mafiaCount})</Typography>
            </Grid>
            {roleDisplay(mafiaRoles, setMafiaRoles)}
            <Grid item>
              <Typography variant="h5">
                Village roles ({villagerCount}){" "}
              </Typography>
            </Grid>
            {roleDisplay(villageRoles, setVillageRoles)}
          </Grid>
        </Grid>
        <Grid item className="three-column">
          <Typography variant="h4">People ({players})</Typography>
          <Grid container className="people-names" direction="column">
            {new Array(players).fill("").map((p, i) => (
              <TextField
                key={i}
                variant="outlined"
                style={{ margin: "5px" }}
                label={`Player :${i + 1}`}
                value={playerNames[i]}
                onChange={(e) => {
                  setPlayerNames([
                    ...playerNames.slice(0, i),
                    e.target.value,
                    ...playerNames.slice(i + 1),
                  ]);
                }}
              />
            ))}
            <Button
              variant="contained"
              style={{ margin: "5px" }}
              color="primary"
              onClick={handleAllocate}>
              Allocate!
            </Button>
          </Grid>
        </Grid>
        <Grid item className="three-column">
          <Typography variant="h4">Allocation </Typography>
          <Typography variant="h6">
            Game status - Mafia {mafiaAlive} vs Villagers {villageAlive}
          </Typography>
          <Typography variant="caption">
            {mafiaAlive > villageAlive
              ? "Mafia wins!"
              : villageAlive > 0 && mafiaAlive === 0 && "Village wins!"}
          </Typography>
          <Grid container className="roles" direction="column">
            {allocation.map((role, i) => (
              <Grid
                item
                key={i}
                style={{
                  border: "1px dashed a3a3a3",
                  padding: "5px",
                  textAlign: "justify",
                  color: role.type === "M" ? "red" : "black",
                  textDecoration: role.alive || "line-through",
                }}>
                <Typography variant="body1">
                  {playerNames[i]} - {role.allotedRole}
                </Typography>

                <IconButton
                  size="small"
                  onClick={() => {
                    setAllocation([
                      ...allocation.slice(0, i),
                      { ...role, alive: !role.alive },
                      ...allocation.slice(i + 1),
                    ]);
                  }}>
                  {role.alive === true ? (
                    <CheckCircleOutlineIcon />
                  ) : (
                    <CancelIcon />
                  )}
                </IconButton>
                <TextField placeholder="game master notes" />
              </Grid>
            ))}
          </Grid>
          <Typography variant="h4">Narrator Notes</Typography>
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="flex-start">
            {uniqueAvailableRoles
              .filter((role) => roleDescriptions[role].narrator !== "")
              .map((role, i) => (
                <Grid item key={i}>
                  <strong>{role}</strong> - {roleDescriptions[role].narrator}
                </Grid>
              ))}
          </Grid>
        </Grid>
              </Grid>*/}
      </Grid>
    </BrowserRouter>
  );
}

export default App;
