import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { createRower } from '../actions/rowers/create'
import SnackbarAddRower from '../components/SnackbarAddRower'
import './RowersEditor.css'


class RowersEditor extends PureComponent {

  saveRower(event) {

      event.preventDefault()

      const rower = {
        firstname: this.refs.firstname.value,
        lastname: this.refs.lastname.value
      }
      const rowers = this.props.rowers.map(rower => rower.firstname && rower.lastname);
      if (!rowers.includes(rower.firstname && rower.lastname)){
        this.props.save(rower)
        return true;
      }
      return false
  }

  render() {
    return (
      <span><div className="editor">
        <form>
          <input className="input"
            type="firstname"
            ref="firstname"
            placeholder="first name"
          />
          <input className="input"
              type="lastname"
              ref="lastname"
              placeholder="last name"
            />
        </form>
        <div className = 'snackbar'>
           <SnackbarAddRower handleAdd={this.saveRower.bind(this)} />
        </div>
      </div></span>
    )
  }
}
const mapStateToProps = ({rowers}) => ({rowers})
const mapDispatchToProps = { save : createRower}
export default connect(mapStateToProps, mapDispatchToProps) (RowersEditor)
