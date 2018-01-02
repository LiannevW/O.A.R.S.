import Charts from './charts'
import Heat2 from './heat2';
import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardText, CardMedia} from 'material-ui/Card';


class boatPageChartsLayer extends Component {
  render() {
    return(
    <div>
    <Charts />

    <Card style= {{width: '600px', marginLeft: 10, marginRight: 10, flex:1}}>
     <CardHeader
      title= "HeatMap"
      titleStyle={{textAlign: "center",
                   marginBottom:"20px"}}
                   showExpandableButton={true}
      />
       <CardMedia expandable={true}>
       <div className= "heat">
        <Heat2 />
       </div>
       </CardMedia>
    </Card>
    </div>
  );
}
}

export default boatPageChartsLayer;
