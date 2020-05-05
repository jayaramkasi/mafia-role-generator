import React from "react";
import { withRouter } from "react-router-dom";
import { Grid, IconButton } from "@material-ui/core";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import HelpIcon from "@material-ui/icons/Help";
import GroupIcon from "@material-ui/icons/Group";

export default withRouter(function NavigationLinks(props) {
  const navigationButton = (icon, to) => (
    <Grid item>
      <IconButton
        size="medium"
        color="primary"
        onClick={() => {
          props.history.push(to);
        }}>
        {icon}
      </IconButton>
    </Grid>
  );

  return (
    <Grid
      container
      direction="row"
      justify="flex-start"
      style={{ padding: "15px" }}>
      {navigationButton(
        <HomeRoundedIcon color="primary" titleAccess="Home screen" />,
        "/"
      )}
      {navigationButton(
        <HelpIcon color="primary" titleAccess="How to play" />,
        "/howtoplay"
      )}
      {navigationButton(
        <GroupIcon color="primary" titleAccess="How to play" />,
        "/roles"
      )}
    </Grid>
  );
});
