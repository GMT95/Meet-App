import React, { Component } from 'react';
import { Button, Card, Image, Icon } from 'semantic-ui-react'
import Cards, { Card as SCard } from 'react-swipe-deck'
import '../App.css';
import firebase from '../config/firebase'

const Database = firebase.database();
// const userId = firebase.auth().currentUser.uid;

// const optionsRef = Database.ref(`/options/${userId}`)
// optionsRef.on('value',(snapshot) => {
//   console.log(snapshot);
// })

const MyCard =  (props) => {
  
  return (
    <Card>
    <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' />
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

const data = ['Alexandre', 'Thomas', 'Lucien']



const Wrapper = (props) => {
  return (
	  
    <Cards onEnd={props.onEnd} className='master-root' size= {[300, 500]}> 
        {data.map(item => 
          <SCard 
            onSwipeLeft={() => console.log('Left')} 
            onSwipeRight={() => console.log('right')}
            //size= {[300, 500]}
            >
            <MyCard header={item} style={{position: 'relative', overflow: 'hidden', width: 300, height: 500}}/>
          </SCard>
        )}
      </Cards>
    
  )
}

class Main extends Component {
  constructor() {
    super();
    this.state = {
      meeting: false
    }

    this.startMeeting = this.startMeeting.bind(this);
    this.onCardEnd = this.onCardEnd.bind(this);
  }

  onCardEnd() {
    this.setState({meeting: false})
  }

  startMeeting() {
    this.setState({meeting: true})
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
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
          console.log(snapshot.val());
        })
      } else {
        console.log('Not logged IN')
      }
    });
  }
  
  render() {
    const {meeting} = this.state;
    
    return (
    !meeting ? 
    <div className="App">
    <h1>You have not done any meetings yet</h1>
    <Button primary onClick={this.startMeeting}><i>Start a meeting</i></Button>
    </div> :
    <div className="App">
      <Wrapper onEnd={this.onCardEnd}/>
    </div>
    )
  }
}

export default Main;