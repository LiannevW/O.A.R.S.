import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { fetchRowers } from '../actions/rowers/fetch'
import RowersEditor from './RowersEditor'
import avatar from '../img/avatar.png'
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Avatar from 'material-ui/Avatar';
import './RowersContainer.css'


class RowersContainer extends PureComponent {

  componentWillMount() {
    this.props.fetchRowers()
  }

  linkToOneRower = rowerId => event => this.props.push(`/rowers-path/${rowerId}`);

  render() {

  return (
    <div>
      <div className = 'List'>
        <List>
          {this.props.rowers.map((rower) => (
            <ListItem key={rower.id} leftAvatar={
               <Avatar src= {avatar} size={30}  />}
                style={{  margin: '50x', padding: '0,5rem',  }}

                onClick={this.linkToOneRower(rower.id)}>{rower.firstname} {rower.lastname}
            </ListItem>
          ))}
        </List>
      </div>
      <div className = 'editor'>
        <RowersEditor />
      </div>
    </div>
    )
  }
}

const mapStateToProps = ({ rowers }) => ({ rowers })
export default connect (mapStateToProps, {fetchRowers, push}) (RowersContainer)
