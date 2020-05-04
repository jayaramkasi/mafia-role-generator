import React from "react";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateAllocation } from "../../redux/actions";

import { Grid, Typography, TextField, IconButton } from "@material-ui/core";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import CancelIcon from "@material-ui/icons/Cancel";
import SendIcon from "@material-ui/icons/Send";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

import roleDescriptions from "../../roleDescriptions.json";

export default withRouter(function GameManagementPage(props) {
  const dispatch = useDispatch();
  const playerNames = useSelector(state => state.playerNames),
    allocation = useSelector(state => state.allocation);

  const aliveAllocation = allocation.filter(role => role.alive);
  const mafiaAlive = aliveAllocation.filter(role => role.type === "M").length,
    villageAlive = aliveAllocation.filter(
      role => role.type !== "M" || role.allotedRole === "idiot"
    ).length;

  return (
    <Grid
      container
      direction="row"
      justify="flex-start"
      align-items="flex-start">
      <IconButton onClick={() => props.history.push("/design")}>
        <ChevronLeftIcon />
      </IconButton>

      <Grid item>
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
                textDecoration: role.alive || "line-through"
              }}>
              <Typography variant="body1">
                {playerNames[i]} - {role.allotedRole}
              </Typography>

              <IconButton
                size="small"
                onClick={() => {
                  dispatch(
                    updateAllocation([
                      ...allocation.slice(0, i),
                      { ...role, alive: !role.alive },
                      ...allocation.slice(i + 1)
                    ])
                  );
                }}>
                {role.alive === true ? (
                  <CheckCircleOutlineIcon />
                ) : (
                  <CancelIcon />
                )}
              </IconButton>
              <TextField
                value={role.hook}
                label={`Hook for ${playerNames[i]}`}
                onChange={e => {
                  dispatch(
                    updateAllocation([
                      ...allocation.slice(0, i),
                      { ...role, hook: e.target.value },
                      ...allocation.slice(i + 1)
                    ])
                  );
                }}
              />
              <IconButton
                onClick={() => {
                  fetch(role.hook, {
                    method: "POST",
                    body: JSON.stringify({
                      text: `Your Role: ${role.allotedRole}. Note: ${
                        roleDescriptions[role.allotedRole].player
                      }
                      `
                    })
                  }).then(response => response.json());
                }}>
                <SendIcon />
              </IconButton>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
});
