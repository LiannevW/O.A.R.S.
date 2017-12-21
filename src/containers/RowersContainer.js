import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { fetchRowers } from '../actions/rowers/fetch'
import RowersEditor from './RowersEditor'

class RowersContainer extends PureComponent {

  componentWillMount() {
    this.props.fetchRowers()
  }

  linkToOneRower = rowerId => event => this.props.push(`/rowers-path/${rowerId}`);

  render() {

      return (
        <div>
          <header>

          </header>
          <main>
          <div className = 'editor'>
          <RowersEditor />
          </div>
            <div>
              {this.props.rowers.map((rower) =>
                  <p onClick={this.linkToOneRower(rower.id)}>{rower.firstname}</p>
              )}
            </div>
          </main>
        </div>
      )
  }
}

const mapStateToProps = ({ rowers }) => ({ rowers })
export default connect (mapStateToProps, {fetchRowers, push}) (RowersContainer)
