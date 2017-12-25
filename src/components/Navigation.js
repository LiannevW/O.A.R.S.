import React, {Component} from 'react';
import {Nav, Navbar, NavItem, MenuItem} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css'
import logOut from '../actions/users/log-out'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import PropTypes from 'prop-types'


class Navigation extends Component {

  static propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  push: PropTypes.func.isRequired,
  logOut: PropTypes.func.isRequired,
}

logOut = (event) => {
  event.preventDefault()
  this.props.logOut()
}

logIn = () => {
  this.props.push('/login')
}

  render() {
    const { loggedIn } = this.props

    return (
  <Navbar bsStyle= 'default' fixedTop >
    <Navbar.Header>
      <Navbar.Brand>

      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <NavItem eventKey={1} href="/">trainings</NavItem>
        <NavItem eventKey={2} href="/rowers">rowers</NavItem>
        <MenuItem eventKey={3} href="/ships">ships</MenuItem>
      </Nav>


      <Nav>
        {loggedIn && <NavItem eventKey={1}>
        <a href="" onClick={this.logOut.bind(this)}>Log out</a>
        </NavItem>}
        {!loggedIn && <NavItem eventKey={1}>
        <a href="" onClick={this.logIn.bind(this)}>Log in</a>
        </NavItem>}
      </Nav>
    </Navbar.Collapse>
  </Navbar>
  )
 }
}

const mapStateToProps = ({ currentUser }) => ({
  loggedIn: (!!currentUser)
})

export default connect(mapStateToProps, { push, logOut })(Navigation)
