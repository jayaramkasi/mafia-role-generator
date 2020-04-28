import React from "react";
import { withRouter } from "react-router-dom";
import { Grid, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => {});

export default withRouter(function HomePage(props) {
  const classes = useStyles();
  return (
    <Grid>
      <Paper
        onClick={() => {
          props.history.push("/design");
        }}>
        <Typography variant="h3">Game design</Typography>
      </Paper>
    </Grid>
  );
});
