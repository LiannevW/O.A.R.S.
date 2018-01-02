import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { createRower } from '../actions/rowers/create'
import './RowersEditor.css'
import SnackbarAddRower from '../components/SnackbarAddRower'

class RowersEditor extends PureComponent {

  saveRower(event) {

      event.preventDefault()

      const rower = {
        firstname: this.refs.firstname.value,
        lastname: this.refs.lastname.value
      }
      const rowers = this.props.rowers.map(rower => rower.firstname);
      if (!rowers.includes(rower.firstname)){
        this.props.save(rower)
        return true;
      }
      return false
  }

  render() {
    return (
      <div className="editor">
        <form>
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
        <div className = 'snackbar'>
           <SnackbarAddRower handleAdd={this.saveRower.bind(this)} />
        </div>
      </div>
    )
  }
}
const mapStateToProps = ({rowers}) => ({rowers})
const mapDispatchToProps = { save : createRower}
export default connect(mapStateToProps, mapDispatchToProps) (RowersEditor)
