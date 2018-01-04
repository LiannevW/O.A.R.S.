import React, { Component } from 'react';
import MyChart from './Mychart';
import MyMap from './Mymap';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import {Card, CardHeader, CardMedia} from 'material-ui/Card';
import './Charts.css'
import fixtures from '../fixtures/fixture.json'

Number.prototype.toRadians = function() {
  return this * Math.PI / 180;
}

class TrainingsChart extends Component {
  constructor(props){
    super(props);
    this.state = {
      chartData:[{
        color: "#090909",
        points: [{x:0,y:0}]
      }],
      chartFilterColor: [{
        color: 'red',
        points: [{x:0, y:0}]
      }],
      MapPath:[
        {lat: 37.772, lng: -122.214},
        {lat: 21.291, lng: -157.821},
        {lat: -18.142, lng: 178.431},
        {lat: -27.467, lng: 4.373634}
      ],
      FilterMap:[{
        color:'red',
        points:[
        {lat: 37.772, lng: -122.214},
        {lat: 21.291, lng: -157.821},
        {lat: -18.142, lng: 178.431},
        {lat: -27.467, lng: 4.373634}]
      }],
      MapCenter:{
        lat: 51.988472, lng: 4.373634
      },
      color: [1],
      filterColor: [1],
      range: {
        min: 1,
        max: 4,
      },
      value: {
        min: 1,
        max: 4
      },
      prevValue: {
        min: 1,
        max: 4
      },
      filterData: [{color: '#090909', points: [{ x:0, y:0 }]}],
    }
    this.readingExcel = this.readingExcel.bind(this)
  }
  componentWillMount() {
    this.readingExcel()
  }

  calculateDistance(lat1,lat2,lon1,lon2){
   var R = 6371e3; // metres
   var f1 = lat1.toRadians();
   var f2 = lat2.toRadians();
   var Df = (lat2-lat1).toRadians();
   var Dl = (lon2-lon1).toRadians();

   var a = Math.sin(Df/2) * Math.sin(Df/2) +
         Math.cos(f1) * Math.cos(f2) *
         Math.sin(Dl/2) * Math.sin(Dl/2);
   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

   var d = (R * c) ;

   return d;
 }
 compare(a,b) {
    return a[0]-b[0];
}
  readingExcel() {
        const data = fixtures

        var temp = [];
        var tempMap = [];
        var tempColor =[];
        var j = 1;
        var tempData = [];

        for (var k=1;k<data.length-1;k++){
          j++;
          if (data[k][8] === data[j][8]){
           if (this.calculateDistance(Number.parseFloat(data[k][3]),Number.parseFloat(data[j][3]),Number.parseFloat(data[k][4]),Number.parseFloat(data[j][4])) < 1)
                {continue;}

              }
              tempData.push(data[k]);
        }
        //
        // console.log("Data after calculating the distance");
        // console.log(tempData);

        tempData.sort(this.compare);


        // console.log("Data after sort");
        // console.log(tempData);

        // console.log("Number check");
        // console.log(Number.parseFloat(data[1][3]));
        // console.log("Before calculateDistance");
        // console.log(data);
        for(var i=0;i<tempData.length;i++){
          // j++;
          //
          // if (data[i][8] === data[j][8]){
          //  if (this.calculateDistance(Number.parseFloat(data[i][3]),Number.parseFloat(data[j][3]),Number.parseFloat(data[i][4]),Number.parseFloat(data[j][4])) < 1)
          //       {continue;}
          //     }

          switch (tempData[i][8]) {
            case "1" :  tempColor.push('red'); break;
            case "2" :  tempColor.push('blue'); break;
            case "3" :  tempColor.push('green'); break;
            case "4" :  tempColor.push('yellow'); break;
          }

          temp.push({
            x: Number(tempData[i][0]) / 60000,
            y: Number(tempData[i][5])
          });
          tempMap.push({
            lat: Number(tempData[i][3]) + Number(tempData[i][8])/100000,
            lng: Number(tempData[i][4]) + Number(tempData[i][8])/100000
          });
          if(i > data.length/2 && i < data.length/2 +2){
            const center = { lat: 51.988472, lng: 4.373634 }
          }

        }


        this.setState(
          {chartData: [{
              color: 'red',
              points: temp
            }],
            chartFilterColor: this.filterColorChart(temp,tempColor),
            MapPath: tempMap,
            FilterMap: this.filterColorMap(tempMap, tempColor),
            MapCenter: { lat: 51.988472, lng: 4.373634 },
            color: tempColor,
            filterColor: tempColor,
            range: { min: 1, max: temp.length },
            value:{ min: 1, max: temp.length },
            prevValue:{ min: 1, max: temp.length },
            filterData: [{
              color:'red',
              points:temp
            }],
        });
    };


  filterColorChart(chart,color){
    //add 4 colors
    const chartRed= chart.filter((point,index) => {if (color[index]==='red'){return true;}} );
    const chartBlue= chart.filter((point,index) => {if (color[index]==='blue'){return true;}} );
    const chartGreen= chart.filter((point,index) => {if (color[index]==='green'){return true;}} );
    const chartYellow= chart.filter((point,index) => {if (color[index]==='yellow'){return true;}} );

    return [{color:'red', points: chartRed},{color:'blue', points: chartBlue},{color:'green', points: chartGreen},{color:'yellow', points: chartYellow},]
  }
  filterColorMap(map,color) {
    //same code for mappath
    const mapRed= map.filter((point,index) => {if (color[index]==='red'){return true;}} );
    const mapBlue= map.filter((point,index) => {if (color[index]==='blue'){return true;}} );
    const mapGreen= map.filter((point,index) => {if (color[index]==='green'){return true;}} );
    const mapYellow= map.filter((point,index) => {if (color[index]==='yellow'){return true;}} );

    return [{color:'red', points: mapRed},{color:'blue', points: mapBlue},{color:'green', points: mapGreen},{color:'yellow', points: mapYellow},]
  }
  sliderHandler(value){
    if (this.state.range.max<1000){
      this.setState({ value });
    }
    else {
      if (this.state.value.max-this.state.value.min<200){
        if (this.state.value.max !== this.state.prevValue.max){
          this.setState({value:{min: this.state.value.min, max: this.state.value.min+200 } });
        }
        else {  this.setState({value:{min: this.state.value.max-200, max: this.state.value.max } }); }
      }
      else { this.setState({ value }); }
     }
     //add prevValue so I can check next time if min or max value is changed on slider
    this.setState({prevValue: this.state.value});

    const tems = this.state.chartData[0].points.filter( (point,index) => {
        if (index>=this.state.value.min && index<=this.state.value.max) {
          return true;
        }
      }
    );
    const tempColor = this.state.color.filter( (point,index) => {
        if (index>=this.state.value.min && index<=this.state.value.max) {
          return true;
        }
     }
    );
    const tempMap= this.state.MapPath.filter( (point,index) => {
        if (index>=this.state.value.min && index<=this.state.value.max) {
          return true;
        }
    });
    this.setState({ FilterMap: this.filterColorMap(tempMap,tempColor) });
    this.setState({ filterData: [{ color:'red', points: tems }]});
    this.setState({ filterColor: tempColor })
    //renew filteredColorChart based on slider values
    this.setState({ chartFilterColor: this.filterColorChart(tems,tempColor)})
  }

render() {

    return (
      <div className="Charts">
       <Card
        style= {{width: '1200px', margin: 'auto', marginTop: 120, flex:1}}>
        <CardHeader
         title= "Route"
         titleStyle={{textAlign: "center",
                      marginBottom:"20px"}}
         showExpandableButton={true}
         actAsExpander={true}
         />
          <CardMedia expandable={true}>
          <div className= "route">
          <div className='range'>
           <InputRange minValue={this.state.range.min} maxValue={this.state.range.max} formatLabel={value => `${parseInt(value / 244)} mins`} value={this.state.value} onChange={value =>this.setState({ value })} onChangeComplete={value=> this.sliderHandler(value)}/>
          </div>
           <MyMap MapPath = {this.state.FilterMap} MapCenter = {this.state.MapCenter}/>
          </div>
          </CardMedia>
       </Card>
      <Card
        style= {{width: '1200px', margin: 'auto', marginTop: 10, flex:1}}
        expanded={true}>
       <CardHeader
        title= "Velocity"
        titleStyle={{textAlign: "center", marginBottom:"20px"}}
        showExpandableButton={true}
        actAsExpander={true}
      />
      <CardMedia expandable={true}>
      <div className='range'>
       <InputRange minValue={this.state.range.min} maxValue={this.state.range.max} formatLabel={value => `${parseInt(value / 244)} mins`} value={this.state.value} onChange={value =>this.setState({ value })} onChangeComplete={value=> this.sliderHandler(value)}/>
      </div>
       <MyChart chartData = {this.state.chartFilterColor}/>
      </CardMedia>
    </Card>
 </div>



    );
  }
}

export default TrainingsChart;
