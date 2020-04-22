import React, { useState, useEffect } from "react";

import {
  Grid,
  Typography,
  IconButton,
  TextField,
  Button,
} from "@material-ui/core";

import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import CancelIcon from "@material-ui/icons/Cancel";

import roleDescriptions from "./roleDescriptions.json";

import firebase from "firebase";
import "firebase/performance";

import "./App.css";

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
    simple: 1,
    twins: 2,
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

  const handleAllocate = () => {
    if (players !== playerNames.filter((name) => name !== "").length)
      window.alert("Enter all player names or remove roles");
    else if (players < 5) window.alert("Need minimum of 5 players. ");
    else if (players === 0) window.alert("Add some roles");
    else {
      firebase.analytics().logEvent("add_to_cart");
      // Can allocate

      // Shuffle
      let shuffledRoles = shuffle(availableRoles);
      console.log(shuffledRoles);
      let allotedRoles = [];
      // allocate
      for (let i = 0; i < players; i++) {
        const countRolesLeft = shuffledRoles.length;
        const random = Math.random();
        const allotedRoleIndex = Math.floor(random * countRolesLeft);
        const allotedRole = shuffledRoles[allotedRoleIndex];
        allotedRoles.push({ alive: true, allotedRole });
        shuffledRoles.splice(allotedRoleIndex, 1);
      }
      setAllocation(allotedRoles);
    }
  };

  useEffect(() => {
    trace.stop();
  }, []);

  return (
    <Grid className="App" container direction="column" alignItems="center">
      <Typography variant="h2">Mafia role allocator</Typography>
      <Grid
        container
        direction="row"
        justify="space-around"
        align-items="flex-start">
        <Grid item className="three-column">
          <Typography variant="h4">Roles - Click for description</Typography>
          <Grid
            container
            className="roles"
            direction="column"
            alignItems="flex-start">
            <Grid item>
              <Typography variant="h5">Mafia roles ({mafiaCount})</Typography>
            </Grid>
            {Object.entries(mafiaRoles).map(([role, count]) => (
              <Grid item key={role}>
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="flex-start">
                  <Grid item>{role}</Grid>
                  <Grid item>
                    <Grid container>
                      <IconButton
                        disabled={count === 0}
                        size="small"
                        onClick={() => {
                          setMafiaRoles({
                            ...mafiaRoles,
                            [role]: count - 1,
                          });
                        }}>
                        <ArrowDownwardIcon />
                      </IconButton>
                      <Typography variant="body1" color="primary">
                        {count}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => {
                          setMafiaRoles({
                            ...mafiaRoles,
                            [role]: count + 1,
                          });
                        }}>
                        <ArrowUpwardIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            ))}
            <Grid item>
              <Typography variant="h5">
                Village roles ({villagerCount}){" "}
              </Typography>
            </Grid>
            {Object.entries(villageRoles).map(([role, count]) => (
              <Grid item key={role}>
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="flex-start">
                  <Grid item>{role}</Grid>
                  <Grid item>
                    <Grid container>
                      <IconButton
                        disabled={count === 0}
                        size="small"
                        onClick={() => {
                          setVillageRoles({
                            ...villageRoles,
                            [role]: count - 1,
                          });
                        }}>
                        <ArrowDownwardIcon />
                      </IconButton>
                      <Typography variant="body1" color="primary">
                        {count}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => {
                          setVillageRoles({
                            ...villageRoles,
                            [role]: count + 1,
                          });
                        }}>
                        <ArrowUpwardIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item className="three-column">
          <Typography variant="h4">People ({players})</Typography>
          <Grid container className="people-names" direction="column">
            {new Array(players).fill("").map((p, i) => (
              <TextField
                key={i}
                label={`Player :${i + 1}`}
                value={playerNames[i]}
                onChange={(e) => {
                  const newPlayerNames = playerNames;
                  newPlayerNames[i] = e.target.value;
                  setPlayerNames(newPlayerNames);
                }}
              />
            ))}
            <Button
              variant="contained"
              color="primary"
              onClick={handleAllocate}>
              Allocate!
            </Button>
          </Grid>
        </Grid>
        <Grid item className="three-column">
          <Typography variant="h4">Allocation</Typography>
          <Grid container className="roles" direction="column">
            {allocation.map((role, i) => (
              <Grid item key={i}>
                {playerNames[i]} - {role.allotedRole}
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
      </Grid>
    </Grid>
  );
}

export default App;
