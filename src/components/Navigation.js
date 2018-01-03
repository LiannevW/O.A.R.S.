import React, { Component } from 'react';
import { Nav, Navbar, NavItem, MenuItem } from 'react-bootstrap';
import logOut from '../actions/users/log-out'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import PropTypes from 'prop-types'
import logo from '../img/rowcoaching_logo.png'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css'
import './Navigation.css'


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
      <div>
        <Navbar bsStyle= 'default' fixedTop >
          <Navbar.Header>
          <div>
            <Navbar.Brand>
            <a href="/"><img src={logo} alt="" weign="40" height="40"/></a>
            </Navbar.Brand>
          </div>
          <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav className= "navstyle">
              <NavItem eventKey={1} href="/">Trainings   | </NavItem>
              <NavItem eventKey={2} href="/rowers">Rowers    | </NavItem>
              <MenuItem eventKey={3} href="/ships">Ships | </MenuItem>
            </Nav>

            <Nav className= "navstyle" pullRight>
              {loggedIn && <NavItem eventKey={1}>
              <a href="" onClick={this.logOut.bind(this)}>Log out</a>
              </NavItem>}
              {!loggedIn && <NavItem eventKey={1}>
              <a href="" onClick={this.logIn.bind(this)}>Log in</a>
              </NavItem>}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({
  loggedIn: (!!currentUser)
})

export default connect(mapStateToProps, { push, logOut })(Navigation)
