import React, { Component } from 'react';
import Cards, { Card as SCard } from 'react-swipe-deck'
import '../App.css';
import { Button, Card, Image, Icon, Grid, GridColumn } from 'semantic-ui-react'
import firebase from '../config/firebase'
import geofire from "geofire";

const Database = firebase.database();
const data = ['Talha','is','Handsome']

const MyCard =  (props) => {

  return (
    <Card>
      {/* <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' /> */}
      <Image src='https://firebasestorage.googleapis.com/v0/b/meetapp-9aa2c.appspot.com/o/images%2Fac814ea3-bd57-46db-9dbc-f26dbb52134f.jfif?alt=media&token=511692d1-da93-4068-a8e3-af32135af87a' />
      <Card.Content>
        <Card.Header>{props.header}</Card.Header>
        <Card.Meta>
          <span className='date'>@Matts</span>
        </Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button basic color='green'>
            <Icon name='check' />
          </Button>
          <Button basic color='red'>
            <Icon name="close" />
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
}

class UserCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: props.location,
      choices: props.choices,
      loc: [],
      details: [],
      options: [],
      images: []

    }

  }

  fetchUsers() {
    const {loc,options,images,details,location} = this.state
    const USER = firebase.auth().currentUser.uid

    console.log('Current User Location -->',location)
    Database.ref('/userLoc').on('child_added', (loctn) => {
      console.log(loctn.val().uid,'ONLY UID')
      // var key = Object.keys(loctn.val());
      // console.log(key)
      if(loctn.val().uid !== USER) {
        loc.push(loctn.val())
        console.log('loc --> ',loc)
        let otherUserLocation = [loctn.val().latitude,loctn.val().longitude]
        let distance = geofire.distance(location,otherUserLocation).toFixed(3)
        console.log('distance -->> ',distance)
      } 
    })
    Database.ref('/options').on('child_added', (userOptions) => {
      console.log(userOptions.val())
      if(userOptions.val().uid !== USER) {
        options.push(userOptions.val())
        console.log('options -->',options)
      }  
    })
    Database.ref('/profileImages').on('child_added', (userImages) => {
      userImages.forEach((childImages) => {
        console.log(childImages.val())
        if(childImages.val().uid !== USER) {
          images.push(childImages.val())
          console.log('images -->',images)
        }  
      })
    })
    Database.ref('/userDetails').on('child_added', (userDetails) => {
      userDetails.forEach((childDetails) => {
        console.log(childDetails.val())
        if(childDetails.val().uid !== USER) {
          details.push(childDetails.val())
          console.log('details -->',details)
        }

      })
    })
  }


  componentDidMount() {
    this.fetchUsers();
  }

  render() {
    return <Cards onEnd={this.props.onEnd} className='master-root' size= {[400, 600]}>
      {data.map(item =>
        <SCard
          onSwipeLeft={() => console.log('Left')}
          onSwipeRight={() => console.log('right')}
          //size= {[300, 500]}
        >
          <MyCard header={item} style={{position: 'relative', overflow: 'hidden', width: 400, height: 600}}/>
        </SCard>
      )}
    </Cards>
  }
}

export default UserCards;