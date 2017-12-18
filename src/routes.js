import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import TrainingsContainer from
import Training from
import Boatpage from
import rowersContainer from
import rowerProfile from
import shipsContainer from
import shipPage from

export default class Routes extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={TrainingsContainer} />
        <Route path="/training/:trainingId" component={Training} />
        <Route path="/boats-path/:trainingId/:boatId" component={Boatpage} />
        <Route path="/rowers" component={rowersContainer} />
        <Route path="/rowers/:rowerId" component={rowerProfile} />
        <Route path="/ships" component={shipsContainer} />
        <Route path="/ships/:shipsId" component={shipPage} />
      </div>
    )
  }
}
