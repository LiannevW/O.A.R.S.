import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { fetchRowers } from '../actions/rower/fetch'
import RowersEditor from './RowersEditor'

class RowersContainer extends PureComponent {

  componentWillMount() {
    this.props.fetchRowers()
  }

  render() {

      return (
        <div>
          <header>
             <RowersEditor />
          </header>
          <main>
              {this.props.rowers.map((rower) =>
                <p>{rower.firstname}</p>
              )}
          </main>
        </div>
      )
  }
}

const mapStateToProps = ({ rowers }) => ({ rowers })
export default connect (mapStateToProps, {fetchRowers, push}) (RowersContainer)
