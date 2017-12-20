import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { fetchShips } from '../actions/ship/fetch'
import ShipsEditor from './ShipsEditor'


class ShipsContainer extends PureComponent {

  componentWillMount() {
    this.props.fetchShips()
  }

  render() {
    console.log(this.props.ships)

    return (
      <div>
      <header>
        <ShipsEditor/>
      </header>
      <main>
        {this.props.ships.map((ship) =>
          <p>{ship.name}</p>
        )}
      </main>
      </div>
    )
  }
}

const mapStateToProps = ({ ships }) => ({ ships })
export default connect (mapStateToProps, {fetchShips, push}) (ShipsContainer)
