import React from 'react';
import Snackbar from 'material-ui/Snackbar';
import RaisedButton from 'material-ui/RaisedButton';


class SnackbarSave extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleClick = () => {
    this.setState({
      open: true,
    });
    this.props.handleSave();
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    return (
      <div>
        <RaisedButton
          onClick={this.handleClick}
          label="Save"
        />
        <Snackbar
          open={this.state.open}
          message="Your changes are saved"
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }
}

export default SnackbarSave
