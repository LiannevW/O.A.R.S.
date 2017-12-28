import React, { PureComponent } from 'react'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { fetchOneTraining } from '../actions/trainings/fetch'
import { fetchRowers } from '../actions/rowers/fetch'
import { fetchShips} from '../actions/ships/fetch'
//import { fetchboatRowers } from '../actions/rowers/fetch'
import './BoatPage.css'
import PropTypes from 'prop-types'
import SearchRowerandShip from '../components/SearchRower'
import * as XLSX from 'xlsx';
import MyChart from '../components/mychart';
import MyMap from '../components/mymap';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import {Card, CardActions, CardHeader, CardText, CardMedia} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import '../../node_modules/react-linechart/dist/styles.css';

Number.prototype.toRadians = function() {
  return this * Math.PI / 180;
}

class BoatPage extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      chartData:[{
        color: 'steelblue',
        points: [{x:0,y:0}]
      }],
      MapPath:[
        {lat: 37.772, lng: -122.214},
        {lat: 21.291, lng: -157.821},
        {lat: -18.142, lng: 178.431},
        {lat: -27.467, lng: 4.373634}
      ],
      MapCenter:{
        lat: 51.988472, lng: 4.373634
      },
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
      fileLoaded:false,
      filterData: [{color: "green", points: [{ x:0, y:0 }]}],
    }
    this.readingExcel = this.readingExcel.bind(this);
  }
  static propTypes = {
  startdate: PropTypes.date,
  starttime: PropTypes.time,
  duration: PropTypes.time,
  firstname: PropTypes.string,
  lastname: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string
}
  componentWillMount() {

    const { trainingId } = this.props.match.params
      this.props.fetchOneTraining(trainingId)
      this.props.fetchRowers()
      this.props.fetchShips()

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

 var d = (R * c) / 1000;
//  console.log(d);
 return d;
}

readingExcel(){
  var fileToRead = document.getElementById('file').files[0];
  const reader = new FileReader();
  reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, {type:'binary'});
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, {header:1});
      var j = 1;
    for (var i=1;i<data.length-1;i++){
        j++;
      if (this.calculateDistance(Number.parseFloat(data[i][3]),Number.parseFloat(data[j][3]),Number.parseFloat(data[i][4]),Number.parseFloat(data[j][4])) > 0)
        {break;}
    }
      var temp = [];
      var tempMap = [];
      var center = {};
      for(i;i<data.length;i++){
        temp.push({
          x: (data[i][0]) / 60000,
          y: data[i][5]
        });
        tempMap.push({
          lat: Number(data[i][3]),
          lng: Number(data[i][4])
        });
        if(i > data.length/2 && i < data.length/2 +2){
          center = {
            lat: Number(data[i][3]),
            lng: Number(data[i][4])
          };
        }

      }
      console.log(this.state.data);
      this.setState(
        {chartData: [{
            ...this.state.data,
            points:temp,
            color: "steelblue"
          }],
          MapPath: tempMap,
          MapCenter: center,
          range: { min: 1, max: data.length },
          value:{ min: 1, max: data.length },
          prevValue:{ min: 1, max: data.length },
          fileLoaded:true,
      });
  };
  reader.readAsBinaryString(fileToRead);
}
sliderHandler(value){
  if (this.state.range.max<1000){
    this.setState({ value });
  }
  else {
    if (this.state.value.max-this.state.value.min<500){
      if (this.state.value.max !== this.state.prevValue.max){
        this.setState({value:{min: this.state.value.min, max: this.state.value.min+500 } });
      }
      else {  this.setState({value:{min: this.state.value.max-500, max: this.state.value.max } }); }
    }
    else { this.setState({ value }); }
   }
  this.setState({prevValue: this.state.value});
  const tems = this.state.chartData[0].points.filter( (point,index) => {
      if (index>=this.state.value.min && index<=this.state.value.max) {
        return true;
      }
    }
  );
  this.setState({filterData: [{...this.state.data, points: tems, color: "green" }]});

}

  render() {
    const { training, rowers, ships } = this.props

    if(!training) return null;

    return (
      <div>
          <div className='training-info'>
    <Card style= {{width: '900px',
                   dislplay: 'flex',
                   align: 'center',
                   marginLeft:'300px',}}>
      <CardHeader
        title={` Training of ${training.startdate} `}
        titleStyle={{textAlign: "center",
                     marginBottom:"20px"}}
        subtitle=  {`| start time ${training.starttime} |training duraton: ${training.duration} `}
        subtitleStyle={{textAlign: "center",
                        marginBottom:"20px"}}
        showExpandableButton={true}
      />
      <CardActions>
         <FlatButton label="Boat of 2 " actAsExpander={true} expandable={true}/>
         <FlatButton label="Boat of 4" actAsExpander={true} expandable={true}/>
         <FlatButton label="Boat of 8" actAsExpander={true} expandable={true}/>
         <FlatButton label="DrawGraph" onClick={this.readingExcel.bind(this)}/>
         <input type="file" id="file" className='FileInput'/>
      </CardActions>
      <CardText expandable={true}>
      <p> Select Rowers and Ship for this boat </p>
        <SearchRowerandShip trainingId={this.props.trainingId} boat_number_name={this.props.boat_number_name} />
      </CardText>
    </Card>
    </div>
    <div className= 'drawgraphs'>
    </div>

    <div className='chart'>
    <Card style= {{width: '800px', marginLeft: 30, marginRight: 30, flex:1}}>
      <CardHeader
      title= "Velocity"
      titleStyle={{textAlign: "center",
                   marginBottom:"20px"}}
      showExpandableButton={true}
      />
      <CardMedia expandable={true}>
      <div className='range'>
      <InputRange minValue={this.state.range.min} maxValue={this.state.range.max} value={this.state.value} onChange={value =>this.setState({ value })} onChangeComplete={value=> this.sliderHandler(value)} /> : null }
      </div>
      <MyChart chartData = {this.state.filterData}  />
      </CardMedia>
    </Card>

    <Card style= {{width: '800px', marginLeft: 30, marginRight: 30, flex:1}}>
      <CardHeader
        title= "Map"
        titleStyle={{textAlign: "center",
                     marginBottom:"20px"}}
        showExpandableButton={true}
        />
        <CardMedia expandable={true}>
          <MyMap MapPath = {this.state.MapPath} MapCenter = {this.state.MapCenter}/>
        </CardMedia>
      </Card>
    </div>
  </div>
    )
  }
}

const mapStateToProps = ({ trainings, rowers, ships }, { match }) => { 
const training = trainings.filter((t) => (t.id === +match.params.trainingId))[0] 
const trainingId = match.params.trainingId;
const boat_number_name = match.params.boat_number_name;
const shipId = match.params.shipId;
 
return { 
  training, rowers, ships, trainingId, boat_number_name, shipId
  } 
} 
export default connect(mapStateToProps, { fetchOneTraining, fetchRowers, fetchShips, push }) (BoatPage)
