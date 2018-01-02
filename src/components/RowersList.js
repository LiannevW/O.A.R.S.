import React, { PureComponent } from 'react'
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import { ResponsiveDrawer} from 'material-ui-responsive-drawer'
import RaisedButton from 'material-ui/RaisedButton';
import { fetchRowers } from '../actions/rowers/fetch'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import './RowersList.css'
import RowersEditor from '../containers/RowersEditor'
class RowersList extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {open: true};
  }

  componentWillMount() {
    this.props.fetchRowers()
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});

  linkToOneRower = rowerId => event => this.props.push(`/rowers-path/${rowerId}`);

  render() {
    return (
     <div className='editor'>
      <div className='handleToggle'>
        <RaisedButton
         label="RowersList"
         onClick={this.handleToggle}
        />
        </div>
         <ResponsiveDrawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
         >
        <div>
         <List className='list'>
          {this.props.rowers.map((rower) => (
           <ListItem
            key={rower.id}
            primaryText= {`${rower.firstname} ${rower.lastname}`}
            onClick={this.linkToOneRower(rower.id)}
            >
           </ListItem>
          ))}
         </List>
        </div>
         <RowersEditor />
       </ResponsiveDrawer>
    </div>
    );
  }
}

const mapStateToProps = ({ rowers }) => ({ rowers })
export default connect (mapStateToProps, {fetchRowers, push}) (RowersList)
