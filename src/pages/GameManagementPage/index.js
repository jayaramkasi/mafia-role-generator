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
      <Row>
        <Col>
          <h1>
            <FontAwesomeIcon
              icon={faChevronLeft}
              style={{ marginRight: "16px" }}
              onClick={() => {
                props.history.push("/");
              }}
            />
            Allocation
          </h1>
          <h3>
            Game status - Mafia {mafiaAlive} vs Villagers {villageAlive}
          </h3>
          <h3>
            {mafiaAlive > villageAlive
              ? "Mafia wins!"
              : villageAlive > 0 && mafiaAlive === 0 && "Village wins!"}
          </h3>
          <Container>
            {allocation.map((role, i) => (
              <Row
                key={i}
                style={{
                  margin: "16px",
                  textDecoration: role.alive || "line-through"
                }}>
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
                <FontAwesomeIcon
                  style={{ marginLeft: "16px", cursor: "pointer" }}
                  icon={role.alive ? faCheckCircle : faBan}
                  onClick={() => {
                    dispatch(
                      updateAllocation([
                        ...allocation.slice(0, i),
                        { ...role, alive: !role.alive },
                        ...allocation.slice(i + 1)
                      ])
                    );
                  }}
                />
                <InputGroup>
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
                    <FontAwesomeIcon
                      icon={faPaperPlane}
                      style={{ margin: "20px" }}
                      onClick={async () => {
                        let otherAlerts = [];
                        if (role.allotedRole === "twins") {
                          otherAlerts = allocation
                            .map((role, index) => ({
                              ...role,
                              index
                            }))
                            .filter(role => role.allotedRole === "twins");
                        }
                        if (role.type === "M") {
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
                              text: `Your Role: ${role.allotedRole}. \nNote: ${
                                roleDescriptions[role.allotedRole].player
                              }. ${
                                role.allotedRole === "twins" ||
                                role.type === "M"
                                  ? `\nYour known teammates: ${otherAlerts.map(
                                      mate =>
                                        `${playerNames[mate.index].name} : ${
                                          role.allotedRole
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
                      }}
                    />
                  </InputGroup.Append>
                </InputGroup>
              </Row>
            ))}
          </Container>
        </Col>
      </Row>
    </Container>
  );
});
