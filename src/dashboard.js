import React, { Component } from 'react';
import firebase from './config/firebase';
import { Link } from 'react-router-dom'

const Database = firebase.database();
class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      nickname: "",
      phoneNumber: ""
    }

    this.sendToDb = this.sendToDb.bind(this);
  }

  sendToDb() {
    const {nickname, phoneNumber} = this.state
    
    Database.ref('/userDetails').set({
      Nickname: nickname,
      PhoneNumber: phoneNumber
    })

   
  }


  render() {

    return (
      <div>
          Nickname:
      <input onChange={(e) => this.setState({nickname: e.target.value})}/>
          Phone Number:
      <input type="number" onChange={(e) => this.setState({phoneNumber: e.target.value})}/>
      <Link to="/imageupload">
          <button onClick={this.sendToDb}>Next</button>
      </Link>    
      </div>

      );
  }
}



export default Dashboard;