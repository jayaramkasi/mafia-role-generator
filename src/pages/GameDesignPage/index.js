import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { showAlert } from "../../redux/actions";

import { withRouter } from "react-router-dom";
import {
  updateMafia,
  updateVillage,
  updatePlayers,
  updateAllocation
} from "../../redux/actions";

import {
  faChevronUp,
  faChevronDown,
  faAngleDoubleUp,
  faAngleDoubleDown
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import roleDescriptions from "../../roleDescriptions.json";

import firebase from "firebase";
import "firebase/performance";

//Shuffle an array (stackoverflow)
function shuffle(a) {
  let j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = ~~(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

export default withRouter(function GameDesignPage(props) {
  const dispatch = useDispatch();
  const mafiaRoles = useSelector(state => state.mafiaRoles),
    villageRoles = useSelector(state => state.villageRoles),
    mafiaCount = Object.values(mafiaRoles).reduce(
      (sum, value) => sum + value,
      0
    ),
    villagerCount = Object.values(villageRoles).reduce(
      (sum, value) => sum + value,
      0
    ),
    playerNames = useSelector(state => state.playerNames),
    players = mafiaCount + villagerCount,
    dummyArray = new Array(players).fill(0);

  const allRoles = { ...mafiaRoles, ...villageRoles };

  const availableRoles = Object.entries(allRoles)
    .filter(([, count]) => count > 0)
    .reduce((roleArray, [role, count]) => {
      for (let i = 0; i < count; i++) roleArray.push(role);
      return roleArray;
    }, []);

  const uniqueAvailableRoles = [...new Set(availableRoles)];

  const handleAllocate = e => {
    e.preventDefault();
    if (playerNames.length !== players)
      dispatch(
        showAlert("Enter all player names or remove roles", true, "Error")
      );
    else if (players < 5)
      dispatch(showAlert("Need minimum of 5 players.", true, "Error"));
    else if (players === 0)
      dispatch(showAlert("Add some roles", true, "Error"));
    else {
      firebase.analytics().logEvent("add_to_cart");

      // Shuffle
      let shuffledRoles = shuffle(availableRoles);

      let allotedRoles = [];
      // allocate randomly (Second shuffle)
      for (let i = 0; i < players; i++) {
        const countRolesLeft = shuffledRoles.length;
        const random = Math.random();
        const allotedRoleIndex = ~~(random * countRolesLeft);
        const allotedRole = shuffledRoles[allotedRoleIndex];

        allotedRoles.push({
          alive: true,
          allotedRole,
          type: roleDescriptions[allotedRole].type
        });
        shuffledRoles.splice(allotedRoleIndex, 1);
      }
      dispatch(updateAllocation(allotedRoles));
      props.history.push("/game");
    }
  };
  const roleDisplay = (roleObject, roleUpdateFn) =>
    Object.entries(roleObject).map(([role, count]) => (
      <Container key={role} style={{ borderBottom: "1px dashed #000000" }}>
        <Row>
          <Col
            style={{ cursor: "pointer" }}
            onClick={() => {
              const { type, description, player, narrator } = roleDescriptions[
                role
              ];

              dispatch(
                showAlert(
                  <>
                    <p>Type: {type} </p>
                    <p>Description: {description}</p>
                    <p>Player notes: {player}</p>
                    <p>Narrator notes: {narrator}</p>
                  </>,
                  true,
                  `Role : ${role}`
                )
              );
            }}>
            {role}
          </Col>
          <Col className="d-flex justify-content-end">
            <FontAwesomeIcon
              style={{
                width: "20px",
                margin: "4px 0px 4px 16px",
                color: count === 0 ? "#a3a3a3" : "inherit"
              }}
              icon={role === "twins" ? faAngleDoubleDown : faChevronDown}
              onClick={() => {
                if (count !== 0) {
                  dispatch(
                    roleUpdateFn({
                      ...roleObject,
                      [role]: count - (role === "twins" ? 2 : 1)
                    })
                  );
                }
              }}
            />
            <span
              style={{
                textAlign: "center",
                width: "20px",
                margin: "4px 0px 4px 16px",
                color: count === 0 ? "inherit" : "#FF0000"
              }}>
              {count}
            </span>

            <FontAwesomeIcon
              style={{ width: "20px", margin: "4px 0px 4px 16px" }}
              icon={role === "twins" ? faAngleDoubleUp : faChevronUp}
              onClick={() => {
                dispatch(
                  roleUpdateFn({
                    ...roleObject,
                    [role]: count + (role === "twins" ? 2 : 1)
                  })
                );
              }}
            />
          </Col>
        </Row>
      </Container>
    ));

  return (
    <Container>
      <Row>
        <Col sm={11}>
          <Container>
            <Row>
              <Col sm={4}>
                <h1>Roles</h1>
                <p>Click on individual roles to popup details</p>
                <h3>Mafia roles ({mafiaCount})</h3>
                {roleDisplay(mafiaRoles, updateMafia)}
                <h3 style={{ marginTop: "20px" }}>
                  Village roles ({villagerCount})
                </h3>
                {roleDisplay(villageRoles, updateVillage)}
              </Col>
              <Col sm={4}>
                <h1 style={{ marginBottom: "30px" }}>People ({players})</h1>
                <Form>
                  {dummyArray.map((p, i) => (
                    <Form.Control
                      key={i}
                      required
                      size="lg"
                      type="text"
                      style={{ margin: "20px" }}
                      placeholder={`Enter name for player ${i + 1}`}
                      value={playerNames[i] ? playerNames[i].name : ""}
                      onChange={e => {
                        dispatch(
                          updatePlayers([
                            ...playerNames.slice(0, i),
                            { ...playerNames[i], name: e.target.value },
                            ...playerNames.slice(i + 1)
                          ])
                        );
                      }}
                    />
                  ))}
                  <Button
                    type="submit"
                    onClick={handleAllocate}
                    style={{ margin: "20px", width: "100%" }}>
                    Allocate!
                  </Button>
                </Form>
              </Col>
              <Col sm={4}>
                <span>
                  <h1>Narrator notes </h1>
                </span>

                {uniqueAvailableRoles
                  .filter(role => roleDescriptions[role].narrator !== "")
                  .map((role, i) => (
                    <p key={i}>
                      <strong>{role} </strong> -
                      {roleDescriptions[role].narrator}
                    </p>
                  ))}
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
});
