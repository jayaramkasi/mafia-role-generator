import React from "react";

import roleDescriptions from "../../roleDescriptions.json";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";

export default function RolesPage(props) {
  const roleDescription = (key, value) => (
    <Row key={key}>
      <Card style={{ margin: "5px", width: "100%" }}>
        <Card.Header>{key}</Card.Header>
        <Card.Body>
          <Card.Title>Team: {value.type}</Card.Title>
          <Card.Text>Description: {value.description}</Card.Text>
          <Card.Text>Player note: {value.player}</Card.Text>
          <Card.Text>Narrator note: {value.narrator}</Card.Text>
        </Card.Body>
      </Card>
    </Row>
  );
  return (
    <Container>
      {Object.entries(roleDescriptions).map(([key, value]) =>
        roleDescription(key, value)
      )}
    </Container>
  );
}
