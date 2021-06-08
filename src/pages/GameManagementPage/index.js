import React from "react";
import { withRouter, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  faCheckCircle,
  faChevronLeft,
  faBan,
  faPaperPlane
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import {
  updateAllocation,
  updatePlayers,
  showToast
} from "../../redux/actions";

import roleDescriptions from "../../roleDescriptions.json";

const isValidUrl = str => {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
};

export default function GameManagementPage(props) {
  const history = useHistory();

  const dispatch = useDispatch();
  const playerNames = useSelector(state => state.playerNames),
    allocation = useSelector(state => state.allocation);

  const aliveAllocation = allocation.filter(role => role.alive);
  const mafiaAlive = aliveAllocation.filter(role => role.type === "M").length,
    villageAlive = aliveAllocation.filter(
      role => role.type !== "M" || role.allotedRole === "idiot"
    ).length;
  const idiotAlive =
    aliveAllocation.filter(role => role.allotedRole === "idiot").length > 0;
  return (
    <Container>
      <Row style={{ width: "100%" }} className="d-flex justify-content-start">
        <Col className="d-flex justify-content-start align-items-center" sm={1}>
          <Button
            variant="light"
            onClick={() => {
              history.push("/");
            }}>
            <FontAwesomeIcon
              icon={faChevronLeft}
              size="2x"
              style={{ marginRight: "16px" }}
            />
          </Button>
        </Col>
        <Col className="d-flex justify-content-start align-items-center">
          <h1>Allocation</h1>
        </Col>
      </Row>

      <Col>
        <Row>
          <Col sm={2}>Game status</Col>
          <Col sm={2} className="">
            Mafia <span style={{ color: "red" }}>{mafiaAlive}</span>
          </Col>
          <Col sm={2}>
            Villagers <span style={{ color: "green" }}>{villageAlive}</span>
          </Col>
          <Col sm={2}>{idiotAlive && `Idiot is active`}</Col>
          <Col sm={4}>
            <strong>
              {mafiaAlive === 0 && villageAlive === 0 ? (
                "Start a game first"
              ) : mafiaAlive >= villageAlive ? (
                <span
                  style={{
                    backgroundColor: "red",
                    padding: "5px",
                    color: "white"
                  }}>
                  Mafia wins!
                </span>
              ) : (
                villageAlive > 0 &&
                mafiaAlive === 0 && (
                  <span
                    style={{
                      backgroundColor: "green",
                      padding: "5px",
                      color: "white"
                    }}>
                    Village wins
                  </span>
                )
              )}
            </strong>
          </Col>
        </Row>

        <Row className="justify-content-end">
          <Col sm={3} style={{ textAlign: "center" }}>
            <strong>Notes, name</strong>
          </Col>
          <Col sm={9} style={{ textAlign: "center" }}>
            <strong>Webhook</strong>
          </Col>
        </Row>
        {allocation.map((role, i) => (
          <Row
            key={i}
            className="justify-content-end"
            style={{
              margin: "16px",
              textDecoration: role.alive || "line-through"
            }}>
            <Col
              sm={3}
              className="d-flex align-items-center justify-content-between">
              <Form.Control style={{ width: "100px" }} />
              <span
                style={{
                  color:
                    role.allotedRole === "godfather"
                      ? "#FF9800"
                      : role.type === "M"
                      ? "#FF0000"
                      : "inherit"
                }}>
                {playerNames[i].name} - {role.allotedRole}
              </span>
            </Col>
            <Col
              sm={9}
              className="d-flex align-items-center justify-content-start">
              <InputGroup
                className="align-items-center"
                style={{
                  margin: "0px 16px",
                  maxWidth: "90%"
                }}>
                <InputGroup.Prepend className="justify-content-center">
                  <Button
                    variant={role.alive ? "success" : "danger"}
                    onClick={() => {
                      dispatch(
                        updateAllocation([
                          ...allocation.slice(0, i),
                          { ...role, alive: !role.alive },
                          ...allocation.slice(i + 1)
                        ])
                      );
                    }}>
                    {role.alive ? "Alive" : "Dead"}
                    <FontAwesomeIcon
                      style={{ marginLeft: "16px", cursor: "pointer" }}
                      icon={role.alive ? faCheckCircle : faBan}
                    />
                  </Button>
                </InputGroup.Prepend>
                <Form.Control
                  value={playerNames[i].hook || ""}
                  placeholder={`Hook for ${playerNames[i].name}`}
                  onChange={e => {
                    dispatch(
                      updatePlayers([
                        ...playerNames.slice(0, i),
                        { ...playerNames[i], hook: e.target.value },
                        ...playerNames.slice(i + 1)
                      ])
                    );
                  }}
                />
                <InputGroup.Append>
                  <Button
                    disabled={!isValidUrl(playerNames[i].hook)}
                    onClick={async () => {
                      let otherAlerts = [];
                      if (role.allotedRole === "twins") {
                        otherAlerts = allocation
                          .map((role, index) => ({
                            ...role,
                            index
                          }))
                          .filter(role => role.allotedRole === "twins");
                      } else if (role.type === "M") {
                        otherAlerts = allocation
                          .map((role, index) => ({
                            ...role,
                            index
                          }))
                          .filter(role => role.type === "M");
                      }

                      if (playerNames[i].hook) {
                        await fetch(playerNames[i].hook, {
                          method: "POST",
                          body: JSON.stringify({
                            text: `*Your Role: ${role.allotedRole}.* \nNote: ${
                              roleDescriptions[role.allotedRole].player
                            }. ${
                              otherAlerts.length > 0 &&
                              (role.allotedRole === "twins" ||
                                role.type === "M" ||
                                role.allotedRole === "cop")
                                ? `\nYour known teammates: ${otherAlerts
                                    .map(
                                      mate =>
                                        `\n${playerNames[mate.index].name} : ${
                                          mate.allotedRole
                                        }`
                                    )
                                    .join("")}`
                                : ""
                            }
                      `
                          })
                        }).then(response => {
                          dispatch(
                            showToast(
                              `Alerted ${playerNames[i].name} - ${role.allotedRole}`,
                              false,
                              "Success"
                            )
                          );
                        });
                      }
                    }}>
                    <FontAwesomeIcon
                      icon={faPaperPlane}
                      style={{ cursor: "pointer" }}
                    />
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </Col>
          </Row>
        ))}
      </Col>
    </Container>
  );
}
