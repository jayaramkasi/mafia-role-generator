import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  updateMafia,
  updateVillage,
  updatePlayers,
  updateAllocation
} from "../../redux/actions";

import {
  Grid,
  Typography,
  IconButton,
  TextField,
  Button
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import roleDescriptions from "../../roleDescriptions.json";

import firebase from "firebase";
import "firebase/performance";

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

const useStyles = makeStyles(() => ({
  column: {
    margin: "40px 10px",
    width: "300px",
    maxWidth: "90%"
  },
  roleDisplayParent: {
    margin: "20px 0px"
  },
  roleDisplay: {
    width: "100%",
    borderBottom: "1px dashed #a3a3a3"
  }
}));

export default withRouter(function GameDesignPage(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const mafiaRoles = useSelector(state => state.mafiaRoles),
    villageRoles = useSelector(state => state.villageRoles),
    mafiaCount = Object.values(mafiaRoles).reduce(
      (sum, value) => sum + value,
      0
    ),
    villagerCount = Object.values(villageRoles).reduce(
      (sum, value) => sum + value,
      0
    ),
    playerNames = useSelector(state => state.playerNames);
  const players = mafiaCount + villagerCount;

  const allRoles = { ...mafiaRoles, ...villageRoles };

  const availableRoles = Object.entries(allRoles)
    .filter(([, count]) => count > 0)
    .reduce((roleArray, [role, count]) => {
      for (let i = 0; i < count; i++) roleArray.push(role);
      return roleArray;
    }, []);

  const uniqueAvailableRoles = [...new Set(availableRoles)];

  const handleAllocate = () => {
    if (players !== playerNames.filter(name => name !== "").length)
      window.alert("Enter all player names or remove roles");
    else if (players < 5) window.alert("Need minimum of 5 players. ");
    else if (players === 0) window.alert("Add some roles");
    else {
      firebase.analytics().logEvent("add_to_cart");
      // Can allocate

      // Shuffle
      let shuffledRoles = shuffle(availableRoles);

      let allotedRoles = [];
      // allocate
      for (let i = 0; i < players; i++) {
        const countRolesLeft = shuffledRoles.length;
        const random = Math.random();
        const allotedRoleIndex = Math.floor(random * countRolesLeft);
        const allotedRole = shuffledRoles[allotedRoleIndex];

        allotedRoles.push({
          alive: true,
          allotedRole,
          type: roleDescriptions[allotedRole].type,
          hook: ""
        });
        shuffledRoles.splice(allotedRoleIndex, 1);
      }
      dispatch(updateAllocation(allotedRoles));
      props.history.push("/game");
    }
  };
  const roleDisplay = (roleObject, roleUpdateFn) =>
    Object.entries(roleObject).map(([role, count]) => (
      <Grid item key={role} className={classes.roleDisplay}>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center">
          <Grid
            item
            style={{ cursor: "pointer" }}
            onClick={() => {
              const { description, player, narrator } = roleDescriptions[role];

              window.alert(`Role : ${role}
Description: ${description}   
Player notes: ${player} 
Master notes: ${narrator}
            `);
            }}>
            {role}
          </Grid>
          <Grid item>
            <Grid container>
              <IconButton
                disabled={count === 0}
                size="small"
                onClick={() => {
                  dispatch(
                    roleUpdateFn({
                      ...roleObject,
                      [role]: count - 1
                    })
                  );
                }}>
                <ArrowDownwardIcon />
              </IconButton>
              <Typography
                variant="body1"
                color={count === 0 ? "inherit" : "secondary"}>
                {count}
              </Typography>
              <IconButton
                size="small"
                onClick={() => {
                  dispatch(
                    roleUpdateFn({
                      ...roleObject,
                      [role]: count + 1
                    })
                  );
                }}>
                <ArrowUpwardIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    ));

  return (
    <Grid
      container
      direction="row"
      justify="space-around"
      align-items="flex-start">
      <Grid item className={classes.column}>
        <Typography variant="h4">Roles</Typography>
        <Typography variant="caption">
          Click on individual role name to read description (popup)
        </Typography>
        <Grid
          container
          className="roles"
          direction="column"
          alignItems="flex-start">
          <Grid item className={classes.roleDisplayParent}>
            <Typography variant="h5">Mafia roles ({mafiaCount})</Typography>
          </Grid>
          {roleDisplay(mafiaRoles, updateMafia)}
          <Grid item className={classes.roleDisplayParent}>
            <Typography variant="h5">
              Village roles ({villagerCount}){" "}
            </Typography>
          </Grid>
          {roleDisplay(villageRoles, updateVillage)}
        </Grid>
      </Grid>
      <Grid item className={classes.column}>
        <Typography variant="h4">People ({players})</Typography>
        <Grid container className="people-names" direction="column">
          {new Array(players).fill("").map((p, i) => (
            <TextField
              key={i}
              variant="outlined"
              style={{ margin: "5px", width: "300px" }}
              label={`Player :${i + 1}`}
              value={playerNames[i]}
              onChange={e => {
                dispatch(
                  updatePlayers([
                    ...playerNames.slice(0, i),
                    e.target.value,
                    ...playerNames.slice(i + 1)
                  ])
                );
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
      <Grid item className={classes.column}>
        <Typography variant="h4">Narrator Notes</Typography>
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="flex-start">
          {uniqueAvailableRoles
            .filter(role => roleDescriptions[role].narrator !== "")
            .map((role, i) => (
              <Grid item key={i}>
                <strong>{role}</strong> - {roleDescriptions[role].narrator}
              </Grid>
            ))}
        </Grid>
      </Grid>
      <Grid item>
        <IconButton
          onClick={() => {
            props.history.push("/game");
          }}>
          <ChevronRightIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
});
