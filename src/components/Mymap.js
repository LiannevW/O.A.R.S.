import React, { Component } from 'react';
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Polyline } from "react-google-maps"


const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCxdzcNWr4OGeOg8kFOcNfBB2Rt6tJCfFI&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%`, top: '50%', left: '50%' }} />,
    containerElement: <div style={{ height: `500px`, width: '1200px' }} />,
      mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={12}
    defaultCenter={props.MapCenter}
  >{ props.MapPath.map( item =>{
    return (<Polyline key={item.color}
    path= {item.points}
    geodesic= {true}
    options={{  strokeColor: item.color,
    strokeOpacity: 1.0,
    strokeWeight: 2}}
  />);
  })}

  </GoogleMap>
)

class MyMap extends Component {
  state = {
    isMarkerShown: false,
  }

  componentDidMount() {
    this.delayedShowMarker()
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 3000)
  }

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false })
    this.delayedShowMarker()
  }

  componentWillReceiveProps(newProps){
    this.props = newProps;
  }


  render() {
    return (
      <MyMapComponent
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
        MapPath = {this.props.MapPath}
        MapCenter = {this.props.MapCenter}
      />
    )
  }
}

MyMap.defaultProps = {
    MapPath:[{ color: 'red', points: [
        {lat: 37.772, lng: -122.214},
        {lat: 21.291, lng: -157.821},
        {lat: -18.142, lng: 178.431},
        {lat: -27.467, lng: 153.027}]}
      ],
      MapCenter:{lat: -27.467, lng: 153.027},

}
export default MyMap
