import React, { Component } from 'react';
import { Button, Card, Image, Icon, Grid} from 'semantic-ui-react'
import '../App.css';
import firebase from '../config/firebase'
import UserCards from './Card'



// const optionsRef = Database.ref(`/options/${userId}`)
// optionsRef.on('value',(snapshot) => {
//   console.log(snapshot);
// })


class Main extends Component {
  constructor() {
    super();
    this.state = {
      meeting: false,
      currentUserLocation: []
    }
    this.startMeeting = this.startMeeting.bind(this);
    this.startMeeting = this.startMeeting.bind(this);
    this.onCardEnd = this.onCardEnd.bind(this);
    this.getUserLocation = this.getUserLocation.bind(this);
  }

  onCardEnd() {
    this.setState({meeting: false})
  }

  startMeeting() {
    this.setState({meeting: true})
  }

  // componentDidMount() {
  //   firebase.auth().onAuthStateChanged(function(user) {
  //     if (user) {
  //       const userId = firebase.auth().currentUser.uid
  //       Database.ref(`/options/${userId}`).on('value',(snapshot) => {
  //         console.log(snapshot.val());
  //       })
  //       Database.ref(`/profileImages/${userId}`).on('value',(snapshot) => {
  //         console.log(snapshot.val());
  //       })
  //       Database.ref(`/userDetails/${userId}`).on('value',(snapshot) => {
  //         console.log(snapshot.val());
  //       })
  //       Database.ref(`/userLoc/${userId}`).on('value',(snapshot) => {
  //         console.log(snapshot.val());
  //       })
  //     } else {
  //       console.log('Not logged IN')
  //     }
  //   });
  // }
  getUserLocation() {
    const Database = firebase.database();
    const userId = firebase.auth().currentUser.uid;
    const {currentUserLocation} = this.state;
    Database.ref(`/userLoc/${userId}`).on('value',(location) => {
      console.log('CL-->',location.val())
      currentUserLocation.push(location.val().latitude)
      currentUserLocation.push(location.val().longitude)
      //currentUserLocation.push('adasdada')
    })
    console.log(currentUserLocation)
    this.setState({currentUserLocation: currentUserLocation })
  }
  
  componentDidMount() {
    this.getUserLocation()
  }

  render() {
    const {meeting} = this.state;
    
    return (
    !meeting ? 
    <div className="App">
    <Grid.Row columns={5}>
    <Grid.Column>
    <Button color='red'>Logout</Button>
    </Grid.Column>
    </Grid.Row>
    <Grid.Row columns={2}>
    <Grid.Column ><h1>You have not done any meetings yet</h1></Grid.Column>
    <Grid.Column><Button primary onClick={this.startMeeting}><i>Start a meeting</i></Button></Grid.Column>
    </Grid.Row>
    </div> :
    <div className="App">
      {/* <Wrapper onEnd={this.onCardEnd}/> */}
      <UserCards onEnd={this.onCardEnd} location={this.state.currentUserLocation}/>
    </div>
    )
  }
}

export default Main;