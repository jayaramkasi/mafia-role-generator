import React from "react";
import { withRouter } from "react-router-dom";
import { Grid, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
  mainContainer: {
    margin: "30px 0px"
  },
  page: {
    cursor: "pointer",
    margin: "5px",
    width: "300px",
    maxWidth: "100%",
    minHeight: "75px",
    padding: "15px"
  }
}));

export default withRouter(function HomePage(props) {
  const classes = useStyles();

  const pagePaper = (route, title, description) => (
    <Paper
      elevation={3}
      style={{ textAlign: "left" }}
      className={classes.page}
      onClick={() => {
        props.history.push(route);
      }}>
      <Typography variant="h3">{title}</Typography>
      <Typography variant="body1">{description}</Typography>
    </Paper>
  );

  return (
    <Grid
      container
      direction="column"
      className={classes.mainContainer}
      alignItems="center">
      {pagePaper(
        "/design",
        "Game design",
        "Game setup -> enter roles & player names & click allocate button"
      )}
      {pagePaper("/roles", "Roles", "Description of all roles")}
      {pagePaper("/howtoplay", "How to play", "Details on how to use this app")}
    </Grid>
  );
});
