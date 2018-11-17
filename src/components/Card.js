import React, { Component } from 'react';
import Cards, { Card as SCard } from 'react-swipe-deck'
import '../App.css';
import { Button, Card, Image, Icon, Grid, GridColumn } from 'semantic-ui-react'
import firebase from '../config/firebase'
import geofire from "geofire";

const Database = firebase.database();
const data = ['Talha','is','Handsome']
const masterUserObject = [];
var USER_ID
const MyCard =  (props) => {

  return (
    <Card>
      {/* <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' /> */}
      <Image src='https://firebasestorage.googleapis.com/v0/b/meetapp-9aa2c.appspot.com/o/images%2Fac814ea3-bd57-46db-9dbc-f26dbb52134f.jfif?alt=media&token=511692d1-da93-4068-a8e3-af32135af87a' size='large' />
      <Card.Content>
        <Card.Header>{props.header}</Card.Header>
        <Card.Meta>
        <span className='date'>@Matts</span>
        </Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button basic color='red'>
            <Icon name="close" />
          </Button>
          <Button basic color='green'>
            <Icon name='check' />
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
}

const MyCard2 =  (props) => {

  return (
    <Card>
      {/* <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' /> */}
      <Image src={props.header.pics[0]} size='large'/>
      <Card.Content>
        <Card.Header>{props.header.nickName}</Card.Header>
        <Card.Meta>
        <span className='date'>{props.header.phoneNumber}</span>
        </Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button basic color='red'>
            <Icon name="close" />
          </Button>
          <Button basic color='green'>
            <Icon name='check' />
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
      images: [],
      distance: 0,
      choiceMatch: false,
      fakeUser: true
      

    }

  }

  convertToArray(userObj) {
    let anotherArray = [];
    let newArray = Object.keys(userObj)

    newArray.map((value) => {
      if(userObj[value] === true) {
      anotherArray.push(value)
      }
    })
    return anotherArray;
  }

  fetchUsers() {
    const {loc,options,images,details,location,choices,choiceMatch} = this.state
    const USER = firebase.auth().currentUser.uid
    USER_ID = USER
    const thisUserChoice = this.convertToArray(choices)
    let otherUserChoice;
    var otherUserPictures;
    var otherUserDetails;

    console.log('Current User Location,Choice -->',location,choices)
    Database.ref('/options').on('child_added',(chois) => {
      if(chois.val().uid !== USER) {
        otherUserChoice = this.convertToArray(chois.val().data)
        console.log(otherUserChoice,'******',thisUserChoice)
        this.setState({choiceMatch: thisUserChoice.some(value => otherUserChoice.includes(value))})
        
      }
    })

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
    if(distance <= 5 && this.state.choiceMatch === true) {
      Database.ref(`/profileImages/${loctn.val().uid}`).on('child_added', (userImages) => {
      
      //console.log(userImages.val())
      //if(userImages.val().uid !== USER) {
      otherUserPictures =  userImages.val().profilePictures
      console.log('Range User images -->',otherUserPictures)
      //}  
              
      })

Database.ref('/userDetails').on('child_added', (userDetails) => {
userDetails.forEach((childDetails) => {
console.log(childDetails.val())
if(childDetails.val().uid !== USER) {
otherUserDetails = childDetails.val()
console.log('details -->',otherUserDetails)
const userObjct = { 
              uid: otherUserDetails.uid, 
              nickName: otherUserDetails.Nickname, 
              phoneNumber: otherUserDetails.PhoneNumber,
              pics: otherUserPictures
            }
console.log(userObjct)
masterUserObject.push(userObjct)
// masterUserObject.map((item) => {
//   console.log('map =-==========--==-==>>>',item.nickName)
// })
this.setState({fakeUser: false})
}

})
})



      
    }
  } 
})


}

sendMeetRequest(receiverId) {
  
  Database.ref(`/meetings/${USER_ID}`).set({
  senderId: USER_ID,
  receiverId,
  status: 'pending'
})

}



componentDidMount() {
  this.fetchUsers();
}

render() {
  const {fakeUser} = this.state
  return (fakeUser === true ?
  <Cards onEnd={this.props.onEnd} className='master-root' size= {[400, 600]}>
    {data.map(item =>
      <SCard
        onSwipeLeft={() => console.log('Left')}
        onSwipeRight={this.props.sendRequest}
        //size= {[300, 500]}
      >
        <MyCard header={item} style={{position: 'relative', overflow: 'hidden', width: 400, height: 600}}/>
      </SCard>
    )}
  </Cards> :
  <Cards onEnd={this.props.onEnd} className='master-root' size= {[400, 600]}>
    {masterUserObject.map(item =>
      <SCard
        onSwipeLeft={() => console.log('Left')}
        onSwipeRight={() => {this.sendMeetRequest(item.uid);}}
        //size= {[300, 500]}
      >
        <MyCard2 header={item} style={{position: 'relative', overflow: 'hidden', width: 400, height: 600}}/>
      </SCard>
    )}
  </Cards>)
}
}

export default UserCards;