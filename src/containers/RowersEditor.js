import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { createRower } from '../actions/rower/create'


class RowersEditor extends PureComponent {

  saveRower(event) {
      event.preventDefault()

      const rower = {
        firstname: this.refs.firstname.value,
        lastname: this.refs.lastname.value
      }

      this.props.save(rower)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.saveRower.bind(this)}>
          <input
            type="firstname"
            ref="firstname"
            placeholder="first name"

          />
          <input
            type="lastname"
            ref="lastname"
            placeholder="last name"
          />
        </form>
        <div>
          <button onClick={this.saveRower.bind(this)}>Add Rower</button>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = { save : createRower}
export default connect(null, mapDispatchToProps) (RowersEditor)
