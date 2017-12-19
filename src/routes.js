import React, { Component } from 'react'
import { Route } from 'react-router-dom'
 import TrainingsContainer from './containers/TrainingsContainer'
import Training from './containers/TrainingsContainer'
import Boatpage from './containers/BoatPage'
import RowersContainer from './containers/RowersContainer'
import RowerProfile from './containers/RowerProfile'
import ShipsContainer from './containers/ShipsContainer'
import ShipPage from './containers/ShipPage'

export default class Routes extends Component {

  render() {
    return (
      <div>
        <Route exact path="/" component={TrainingsContainer} />
        <Route path="/training/:trainingId" component={Training} />
        <Route path="/boats-path/:trainingId/:boatId" component={Boatpage} />
        <Route path="/rowers" component={RowersContainer} />
        <Route path="/rowers/:rowerId" component={RowerProfile} />
        <Route path="/ships" component={ShipsContainer} />
        <Route path="/ships/:shipsId" component={ShipPage} />
      </div>
    )
  }
}

   <Route exact path="/" component={TrainingsContainer} />
