import React, { Component } from 'react';
import firebase from './config/firebase'
import './App.css';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import { BrowserRouter as Router ,Route,Link,Redirect } from 'react-router-dom' 
import Dashboard from './components/dashboard';
import ImageUpload from './components/imageUpload'
import userLocation from './components/userLocation'
import MainDashboard from './components/mainDashboard'
import Option from './components/option'
import { Button, Checkbox, Form, Container, Grid, Icon } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

const provider = new firebase.auth.FacebookAuthProvider();
const Database = firebase.database();

class App extends Component {

  constructor() {
    super()
    
    this.state = {
      coords: null,
      loggedIn: false,
      initalSetup: false
    }

    this.updateCoords = this.updateCoords.bind(this)
  }
  componentDidMount() {
    const that = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        localStorage.setItem('User',true);
        that.setState({loggedIn: true});
        const userId = firebase.auth().currentUser.uid
        Database.ref(`/options/${userId}`).on('value',(snapshot) => {
          console.log(snapshot.val());
        })
        Database.ref(`/profileImages/${userId}`).on('value',(snapshot) => {
          console.log(snapshot.val());
        })
        Database.ref(`/userDetails/${userId}`).on('value',(snapshot) => {
          console.log(snapshot.val());
        })
        Database.ref(`/userLoc/${userId}`).on('value',(snapshot) => {
          if(snapshot.val() !== null) { 
          that.setState({initalSetup: true})
          }
        })
      } else {
        console.log('Not logged IN')
      }
      });
  }

  login() {
    firebase.auth().signInWithPopup(provider).then(function (result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.

      var user = result.user;
      console.log('User...', user);
      // ...
    }).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }

  updateCoords({latitude,longitude}) {
    this.setState({coords: {latitude,longitude}})
  }

  render() {
    const {loggedIn,initalSetup} = this.state
    const UserCheck = localStorage.getItem('User');
    return (
      
      JSON.parse(UserCheck) ?
      <div>
      <Router>
          <div>
            {/* <Link to="/dashboard">next</Link>n */}
            <Route exact path='/dashboard' component={Dashboard}/>
            <Route exact path='/imageupload' component={ImageUpload}/>
            <Route exact path='/options' component={Option}/>
            <Route exact path='/map' component={userLocation}/>
            <Route exact path='/home' component={MainDashboard}/>
            {loggedIn && initalSetup ?  
            <Redirect to='/home' component={MainDashboard}/> : 
            <Redirect to='/dashboard' component={Dashboard}/>}
          </div>
      </Router>
      
      </div>
      : <Button color='facebook' onClick={this.login}>
          <Icon name='facebook' /> Facebook
        </Button>
      
    );
  }
}

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


export default App;
