// import React, { PureComponent } from 'react'
// import PropTypes from 'prop-types'
// import { connect } from 'react-redux'
// import { push } from 'react-router-redux'
// import AppBar from 'material-ui/AppBar'
// import FlatButton from 'material-ui/FlatButton'
// import IconButton from 'material-ui/IconButton';
// import ActionHome from 'material-ui/svg-icons/action/home';
//
// const TITLE = 'O.A.R.S'
// const styles = {
//   large: {
//     width: 40,
//     height: 40,
//     padding: 5,
//   },
// };
//
// class Navigation extends PureComponent {
//   static propTypes = {
//     signedIn: PropTypes.bool.isRequired,
//     push: PropTypes.func.isRequired,
//     signOut: PropTypes.func.isRequired,
//   }
//
//   signOut = (event) => {
//     event.preventDefault()
//     this.props.signOut()
//   }
//
//   signUp = () => {
//     this.props.push('/sign-up')
//   }
//
//   goHome = () => {
//     this.props.push('/')
//   }
//
//   render() {
//     const { signedIn } = this.props
//     return (
//       <AppBar
//         title={TITLE}
//         iconElementLeft=  {<IconButton onClick={this.goHome}><ActionHome style={styles.large}/></IconButton> }
//       />
//     )
//   }
// }
//
// const mapStateToProps = ({ currentUser }) => ({
//   signedIn: (!!currentUser && !!currentUser._id)
// })
//
// export default connect(mapStateToProps, { push, signOut })(Navigation)
