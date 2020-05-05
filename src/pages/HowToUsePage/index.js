import React from "react";
import { withRouter } from "react-router-dom";
import { Grid, Typography, Link } from "@material-ui/core";

import NavigatorLinks from "../../components/NavigationLinks";

export default withRouter(function HowToUsePage(props) {
  return (
    <Grid
      container
      direction="column"
      style={{ padding: "15px", maxWidth: "100%" }}>
      <NavigatorLinks />
      <Grid item>
        <Typography variant="h3">How to use this app</Typography>
      </Grid>
      <Grid item>
        <Typography variant="body1">
          The app was built targetting gamemasters of{" "}
          <a href="https://en.wikipedia.org/wiki/Mafia_(party_game)">
            Mafia (party game)
          </a>
          , a social deduction game.
        </Typography>
        <br />
        <Typography variant="body1">
          1. Before the game starts, go to <Link to="/design">Design Page</Link>{" "}
          and choose the number of roles of each faction, according to your game
          design.
        </Typography>
        <br />
        <Typography variant="body1">
          2. Click the names of the players in the inputs provided, and click
          allocate.
        </Typography>
        <br />
        <Typography variant="body1">
          3. You'll be taken to the Game management screen where the player's
          names and alloted roles will be available. Ping each member of the
          group their role, and start the game!
        </Typography>
        <br />
        <Typography variant="body1">
          Optional 4. In case you have webhooks for each person created (slack
          or hangouts chat or any custom), you can make an optional POST call to
          a URL that you specify.
          <br />
          <br />
          You can alternatively use your own implementation to alert a person of
          their role.
          <br />
          <br />
          API call out. <br />
          <br />
          url: -- Entered by the user -- <br />
          Type: POST <br />
          Headers: {`{ Content-Type: application/json }`}
          <br /> body:
          {`{ text: "<<<ROLE AND DESCRIPTION>>> ". }`}
        </Typography>
      </Grid>
    </Grid>
  );
});
