import React from "react";
import { withRouter } from "react-router-dom";

import Container from "react-bootstrap/Container";

export default withRouter(function HowToUsePage(props) {
  return (
    <Container style={{ padding: "15px", maxWidth: "100%" }}>
      <h1>How to use this app</h1>
      <div>
        The app was built targetting gamemasters of{" "}
        <a href="https://en.wikipedia.org/wiki/Mafia_(party_game)">
          Mafia (party game)
        </a>
        , a social deduction game.
      </div>
      <br />

      <div>
        1. Before the game starts, go to <a href="/">Design Page</a> and choose
        the number of roles of each faction, according to your game design.
      </div>
      <br />
      <p>
        2. Click the names of the players in the inputs provided, and click
        allocate.
      </p>
      <br />
      <p>
        3. You'll be taken to the Game management screen where the player's
        names and alloted roles will be available.
      </p>
      <br />
      <div>
        4. Either <br />
        a. Ping each member of the group their role, and start the game!
        <br />
        OR
        <br />
        b. In case you have webhooks for each person created (slack or Google
        Chat or any custom), you can make an optional POST call to a URL that
        you specify.
        <br />
        Click here to learn how to create webhooks for{" "}
        <a href="https://slack.com/intl/en-in/help/articles/115005265063-Incoming-webhooks-for-Slack">
          Slack
        </a>{" "}
        and{" "}
        <a href="https://developers.google.com/chat/how-tos/webhooks">
          Google Chat
        </a>
        .
        <br />
        <br />
        You can alternatively write your own implementation to alert a person of
        their role. <br /> Your API must be prepared to accept the call as
        detailed below.
        <br />
        <br />
        <p
          style={{
            backgroundColor: "lightgrey",
            padding: "10px 30px",
            borderRadius: "5px"
          }}>
          url: <i>URL to be called</i> <br />
          Method: POST <br />
          Headers: {`{ Content-Type: \`application/json\` }`}
          <br /> body:
          {` \n { \n text: \`\$\{ROLE AND DESCRIPTION\} \` }`}
        </p>
      </div>
    </Container>
  );
});
