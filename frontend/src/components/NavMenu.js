import React, { useContext } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css";

import { NavigationContext } from "../Context/NavigationContext";

const NavMenu = () => {
  const { selectedItem, setSelectedItem } = useContext(NavigationContext);

  const handleSelect = (eventKey) => {
    setSelectedItem(eventKey);
  };

  return (
    <Navbar className="bg-body-tertiary" collapseOnSelect expand="x">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ backgroundColor: "white" }} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Choose your View" id="basic-nav-dropdown" onSelect={handleSelect}>
              <NavDropdown.Item eventKey="Jobs" active={selectedItem === "Jobs"} >
                Jobs
              </NavDropdown.Item>
              <NavDropdown.Item eventKey="Fuel" active={selectedItem === "Fuel"}>
                Fuel
              </NavDropdown.Item>
              <NavDropdown.Item eventKey="Maintenance" active={selectedItem === "Maintenance"}>
                Maintenance
              </NavDropdown.Item>
              <NavDropdown.Divider />
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavMenu;
