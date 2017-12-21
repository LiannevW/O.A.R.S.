import React, {Component} from 'react';
import {Nav, Navbar, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css'

class Navigation extends Component {
  render() {
    return (
  <Navbar bsStyle= 'default' fixedTop >
    <Navbar.Header>
      <Navbar.Brand>

      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <NavItem eventKey={1} href="#">trainings</NavItem>
        <NavItem eventKey={2} href="/rowers">rowers</NavItem>
        <MenuItem eventKey={3} href="/ships">ships</MenuItem>

      </Nav>
      <Nav pullRight>
        <NavItem eventKey={1} href="#">Sign out</NavItem>

      </Nav>
    </Navbar.Collapse>
  </Navbar>
  )
 }
}

export default Navigation;
