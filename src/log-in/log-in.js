import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { replace, push } from 'react-router-redux'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
// import FlatButton from 'material-ui/FlatButton'
import signIn from '../actions/users/log-in'
import Title from '../components/Title'
import './log-in.css'
const dialogStyle = {
  width: '400px',
  margin: '50px auto',
  padding: '2rem',
}

const buttonStyle = {
  float: 'right',
  marginLeft: '2rem',
  labelColor: "steelblue"
}

export class LogIn extends PureComponent {
  static propTypes = {
    push: PropTypes.func.isRequired,
    signIn: PropTypes.func.isRequired,
    signedIn: PropTypes.bool,
  }

  componentWillMount() {
    const { replace, signedIn } = this.props
    if (signedIn) replace('/')
  }

  submitForm(event) {
    event.preventDefault()
    const user = {
      username: this.refs.username.getValue(),
      password: this.refs.password.getValue(),
    }
    this.props.signIn(user)
  }

  signIn() {
    this.props.push('/login')
  }

  render() {
    return (
      <div className= "login">
      <Paper style={ dialogStyle }>
        <Title content="Log In" level={2} />

        <form onSubmit={this.submitForm.bind(this)}>
          <div className="input">
            <TextField ref="username" type="username" hintText="Username" />
          </div>
          <div className="input">
            <TextField ref="password" type="password" hintText="Password"  />
          </div>
        </form>

        <RaisedButton
          style={ buttonStyle }
          onClick={ this.submitForm.bind(this) }
          label="Log In"
          backgroundColor= "blue"
          labelColor= "blue"
          primary={true} />
      </Paper>
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({
  signedIn: !!currentUser && !!currentUser._id,
})

export default connect(mapStateToProps, { signIn, replace, push })(LogIn)
