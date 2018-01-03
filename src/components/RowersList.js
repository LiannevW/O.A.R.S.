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
import TextField from 'material-ui/TextField';
class RowersList extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      filteredRowers: [],
      searchInput: ''
    };
  }

  componentWillMount() {
    this.props.fetchRowers()
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});

  componentWillReceiveProps(nextProps) {
    this.setState({
      filteredRowers: nextProps.rowers
    })
  }

  linkToOneRower = rowerId => event => this.props.push(`/rowers-path/${rowerId}`);

  handleChange = (event) => {
    this.setState({
      searchInput: event.target.value,
    });
   };
  searchOneRower() {
    const filteredRowersForSeatch = this.props.rowers.filter(rower => rower.firstname.toUpperCase() === this.state.searchInput.toUpperCase());
    this.setState({
      filteredRowers: filteredRowersForSeatch
    })
  }
  reset() {
    this.setState({
      filteredRowers: this.props.rowers
    })
  }
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
          width={250}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
         >
        <div>
         <List className='list'>
         {this.state.filteredRowers.sort(function(a, b){
           if (a.firstname < b.firstname) {
             return -1
           } else if (a.firstname > b.firstname) {
             return 1
           } else {
             return 0
           }
         }).map((rower) => (
           <ListItem
            key={rower.id}
            primaryText= {`${rower.firstname} ${rower.lastname}`}
            onClick={this.linkToOneRower(rower.id)}
            >
           </ListItem>
          ))}
         </List>
         <TextField
           value={this.state.searchInput}
           onChange={this.handleChange}
         />
         <div className="actions">
           <RaisedButton
           onClick={this.searchOneRower.bind(this)}
           label="Search a rower"
           />
           <RaisedButton
           onClick={this.reset.bind(this)}
           label="Reset"
           />
           </div>
        </div>
         <RowersEditor />
       </ResponsiveDrawer>
    </div>
    );
  }
}

const mapStateToProps = ({ rowers }) => ({ rowers })
export default connect (mapStateToProps, {fetchRowers, push}) (RowersList)
