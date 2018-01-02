import React from 'react';
import Snackbar from 'material-ui/Snackbar';
import RaisedButton from 'material-ui/RaisedButton';


class SnackbarAddRower extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    }
  }

  handleClick = (event) => {
    const result = this.props.handleAdd(event);
    if (result === false){
      this.setState({
        open: true,
      })
    }
  }

  handleRequestClose = () => {
    this.setState({
      open: false,
    })
  }

  render() {
    return (
      <div>
        <RaisedButton
          onClick={this.handleClick}
          label="Add rower"
        />
        <Snackbar
          open={this.state.open}
          message="This rower already exists"
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    )
  }
}

export default SnackbarAddRower
