import Charts from './Charts'
import Heat from './Heat'
import React, { Component } from 'react'
import { Card, CardHeader, CardMedia } from 'material-ui/Card'


class BoatPageChartsLayer extends Component {

  render() {
    return(
      <div>
      <Charts />
        <Card style= {{width: '800px', marginLeft: 400, marginRight: 400, marginTop:20, flex:1}}>
         <CardHeader
          title= "HeatMap"
          titleStyle={{textAlign: "center",
                       marginBottom:"20px"}}
                       showExpandableButton={true}
          />
          <CardMedia expandable={true}>
           <div className= "heat">
            <Heat />
           </div>
          </CardMedia>
        </Card>
      </div>
    )
  }
}

export default BoatPageChartsLayer
