import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import muiTheme from './assets/theme'
import Navigation from './components/Navigation'
import TrainingsContainer from './containers/TrainingsContainer'
import trainings from './fixtures/trainings'
import Routes from './routes'



class App extends Component {
  static childContextTypes = {
    muiTheme: PropTypes.object.isRequired,
  }

  getChildContext() {
    return { muiTheme }
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="App">
          <Navigation />
          <Routes />
          <TrainingsContainer trainings={trainings} />
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
