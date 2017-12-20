import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { Link } from 'react-router'
import TrainingsContainer from './containers/TrainingsContainer'
import Training from './containers/Training'
import Boatpage from './containers/BoatPage'
import RowersContainer from './containers/RowersContainer'
import RowerProfile from './containers/RowerProfile'
import ShipsContainer from './containers/ShipsContainer'
import ShipPage from './containers/ShipPage'
import LogIn from './log-in/log-in.js'

export default class Routes extends Component {

  render() {
    return (
      <div>
        <Route exact path="/" component={TrainingsContainer} />
        <Route path="/trainings/:trainingId" component={Training} />
        <Route path="/boats-path/:trainingId/:boat_number_name" component={Boatpage} />
        <Route path="/rowers" component={RowersContainer} />
        <Route path="/rowers/:rowerId" component={RowerProfile} />
        <Route path="/ships" component={ShipsContainer} />
        <Route path="/ships/:shipsId" component={ShipPage} />
        <Route path="/login" component={LogIn}/>
      </div>
    )
  }
}
