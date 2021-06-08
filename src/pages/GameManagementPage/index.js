import React from "react";
import { withRouter } from "react-router-dom";
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
    <Container>
      <Row style={{ width: "100%" }} className="d-flex justify-content-start">
        <Col className="d-flex justify-content-start">
          <FontAwesomeIcon
            icon={faChevronLeft}
            size="3x"
            style={{ marginRight: "16px" }}
            onClick={() => {
              props.history.push("/");
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <h1>Allocation</h1>
          <h3>
            Game status - Mafia {mafiaAlive} vs Villagers {villageAlive}
          </h3>
          <h3>
            {mafiaAlive >= villageAlive
              ? "Mafia wins!"
              : villageAlive > 0 && mafiaAlive === 0 && "Village wins!"}
          </h3>
          <Container>
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
                  className="d-flex align-items-center justify-content-end">
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
                          } else if (role.allotedRole === "cop") {
                            otherAlerts = allocation
                              .map((role, index) => ({
                                ...role,
                                index
                              }))
                              .filter(role => role.allotedRole === "cop");
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
                                text: `*Your Role: ${
                                  role.allotedRole
                                }.* \nNote: ${
                                  roleDescriptions[role.allotedRole].player
                                }. ${
                                  otherAlerts.length > 0 &&
                                  (role.allotedRole === "twins" ||
                                    role.type === "M" ||
                                    role.allotedRole === "cop")
                                    ? `\nYour known teammates: ${otherAlerts.map(
                                        mate =>
                                          `${playerNames[mate.index].name} : ${
                                            mate.allotedRole
                                          }`
                                      )}`
                                    : ""
                                }
                      `
                              })
                            }).then(response => {
                              dispatch(
                                showToast(
                                  `Alerted ${playerNames[i].name}`,
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
          </Container>
        </Col>
      </Row>
    </Container>
  );
});
