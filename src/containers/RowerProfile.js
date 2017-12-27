import React, { PureComponent } from 'react'
// import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { fetchOneRower } from '../actions/rowers/fetch'

class RowerProfile extends PureComponent {

  componentWillMount() {
    const { rowerId } = this.props.match.params
      this.props.fetchOneRower(rowerId)
  }

render() {
 const { rower } = this.props

  return (
      <div>
         <h1> {rower.firstname } </h1>
         <h2> {rower.lastname} </h2>
         <p> Trainings of this rower:</p>
      </div>
    )
  }
}

const mapStateToProps = ({ rowers }, { match }) => {
const rower = rowers.filter((t) => (t.id === +match.params.rowerId))[0]

return {
  rower
  }
}

export default connect(mapStateToProps, { fetchOneRower, push }) (RowerProfile)
