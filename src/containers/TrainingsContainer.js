import React, { PureComponent } from 'react'
import { FETCHED_TRAININGS } from '../actions/training'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'


export class TrainingsContainer extends PureComponent {
  static propTypes = {
        startdate: PropTypes.string,
        starttime: PropTypes.DATE,
        duration: PropTypes.TIME
  }

  componentWillMount() {
    this.props.FETCHED_TRAININGS()
  }

  render() {
    const { trainings } = this.props

   console.log(this.props)
    return (
        <div>
          {this.props.startdate}
        </div>
      )
    }
}

const mapStateToProps = ({ trainings }) => ({ trainings })


export default connect(mapStateToProps, {FETCHED_TRAININGS})(TrainingsContainer)
