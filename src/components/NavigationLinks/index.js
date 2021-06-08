import React from "react";
import { withRouter, Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faUsers } from "@fortawesome/free-solid-svg-icons";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

export default withRouter(function NavigationLinks(props) {
  return (
    <Navbar
      fixed="top"
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      style={{ padding: "0px 20px" }}>
      <Navbar.Brand>
        <Link to="/">Mafia role allocator</Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto" activeKey="/">
          <Nav.Item className="main-nav-item">
            <Link to="/howtoplay">
              <FontAwesomeIcon icon={faInfoCircle} className="nav-item-icon" />
              How to play
            </Link>
          </Nav.Item>
          <Nav.Item className="main-nav-item">
            <Link to="/roles">
              <FontAwesomeIcon icon={faUsers} className="nav-item-icon" />
              Roles
            </Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
});
