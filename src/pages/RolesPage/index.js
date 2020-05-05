import React from "react";

import NavigationLinks from "../../components/NavigationLinks";

import roleDescriptions from "../../roleDescriptions.json";
import { Grid, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
  rolePaper: {
    margin: "10px",
    padding: "10px"
  }
}));

export default function RolesPage(props) {
  const classes = useStyles();

  const roleDescription = (key, value) => (
    <Grid item>
      <Paper className={classes.rolePaper}>
        <Typography variant="h5">{key}</Typography>
        <Typography variant="body1">Team: {value.type}</Typography>
        <Typography variant="body1">
          Description: {value.description}
        </Typography>
        <Typography variant="body1">Player note: {value.player}</Typography>
        <Typography variant="body1">Narrator note: {value.narrator}</Typography>
      </Paper>
    </Grid>
  );
  return (
    <Grid container direction="column">
      <NavigationLinks />
      {Object.entries(roleDescriptions).map(([key, value]) =>
        roleDescription(key, value)
      )}
    </Grid>
  );
}
