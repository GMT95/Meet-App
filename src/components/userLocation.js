import React, { Component } from 'react';
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from "react-google-maps";
import {Button} from "semantic-ui-react";
import firebase from '../config/firebase';

const Database = firebase.database();

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={14}
    defaultCenter={{ lat: props.coords.latitude, lng: props.coords.longitude }}
    center={{ lat: props.coords.latitude, lng: props.coords.longitude }}
  >
    {props.isMarkerShown && <Marker position={{ lat:props.coords.latitude, lng: props.coords.longitude }}  
    //Make Marker draggable
    draggable={true}

    //Get Marker Position on Drag End
    onDragEnd={(position) =>
      {
        console.log('Latitude',position.latLng.lat(),'Longitude',position.latLng.lng())
        props.updateCoords({latitude: position.latLng.lat(), longitude: position.latLng.lng()})
    }}
    //Center Map on Drag according to Location
    
    />}
  </GoogleMap>
))



class Location extends Component {

  constructor(props) {
    super(props)
    this.state = {
      coords : ""
    }

    this.updateCoords = this.updateCoords.bind(this);
    this.locSubmit = this.locSubmit.bind(this);
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      console.log('Pos',position)
      this.setState({coords: position.coords})
    });
  }

  updateCoords({latitude,longitude}) {
    this.setState({coords: {latitude,longitude}})
  }

  locSubmit() {
    const {coords} = this.state
    console.log('User Location',coords);
    const userId = firebase.auth().currentUser.uid;
    Database.ref(`/userLoc/${userId}`).set({
      latitude: coords.latitude,
      longitude: coords.longitude
    })
  }

  render() {
    const {coords} = this.state;
    return (
      <div>
        {coords && 
        <div>
        <MyMapComponent
          isMarkerShown
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAfJTvrTPPE_gJSgCpRCG46MLevOiWn9t4&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100vh` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          coords={coords}
          updateCoords={this.updateCoords}
        />
        <Button primary onClick={this.locSubmit}>Next</Button>
        </div>
        }
        
      </div>
    );
  }
}



export default Location



//My API ==> googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAfJTvrTPPE_gJSgCpRCG46MLevOiWn9t4&v=3.exp&libraries=geometry,drawing,places"