import React, { Component } from 'react';
import {GoogleMap, Marker, withGoogleMap, withScriptjs} from "react-google-maps";


const MapWithAMarker = withScriptjs(withGoogleMap(props =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  >
    <Marker
      position={{ lat: -34.397, lng: 150.644 }}
    />
  </GoogleMap>
));



class Location extends Component {





  render() {
    return (

      <h1>Hello</h1>

    );
  }
}



export default Location