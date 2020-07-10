import React from "react";
import { withRouter } from "react-router-dom";

import Container from "react-bootstrap/Container";

export default withRouter(function HowToUsePage(props) {
  return (
    <Container style={{ padding: "15px", maxWidth: "100%" }}>
      <h1>How to use this app</h1>
      <p>
        The app was built targetting gamemasters of{" "}
        <a href="https://en.wikipedia.org/wiki/Mafia_(party_game)">
          Mafia (party game)
        </a>
        , a social deduction game.
      </p>
      <br />

      <p>
        1. Before the game starts, go to <a href="/">Design Page</a> and choose
        the number of roles of each faction, according to your game design.
      </p>
      <br />
      <p>
        2. Click the names of the players in the inputs provided, and click
        allocate.
      </p>
      <br />
      <p>
        3. You'll be taken to the Game management screen where the player's
        names and alloted roles will be available. Ping each member of the group
        their role, and start the game!
      </p>
      <br />
      <p>
        Optional 4. In case you have webhooks for each person created (slack or
        hangouts chat or any custom), you can make an optional POST call to a
        URL that you specify.
        <br />
        <br />
        You can alternatively use your own implementation to alert a person of
        their role.
        <br />
        <br />
        API call out. <br />
        <br />
        url: -- Entered by the game master against the player name -- <br />
        Type: POST <br />
        Headers: {`{ Content-Type: application/json }`}
        <br /> body:
        {`{ text: "<<<ROLE AND DESCRIPTION>>> ". }`}
      </p>
    </Container>
  );
});
