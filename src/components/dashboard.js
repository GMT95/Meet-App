import React, {Component} from 'react';
import firebase from '../config/firebase';
import {Link} from 'react-router-dom';
import {Button, Checkbox, Form, Container, Grid} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';


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
    const userId = firebase.auth().currentUser.uid;
    Database.ref(`/userDetails/${userId}`).push({
      Nickname: nickname,
      PhoneNumber: phoneNumber,
      uid: firebase.auth().currentUser.uid
    })


  }


  render() {

    return (
      // <div>
      //     Nickname:
      // <input onChange={(e) => this.setState({nickname: e.target.value})}/>
      //     Phone Number:
      // <input type="number" onChange={(e) => this.setState({phoneNumber: e.target.value})}/>
      // <Link to="/imageupload">
      //     <button onClick={this.sendToDb}>Next</button>
      // </Link>
      // </div>

      <Container>
        <Grid>
          <Grid.Row centered>
            <Grid.Column width={6}>
              <Form>
                <Form.Field>
                  <label>Nick Name</label>
                  <input placeholder='Nick Name'
                         onChange={(e) => this.setState({nickname: e.target.value})}/>
                </Form.Field>
                <Form.Field>
                  <label>Phone Number</label>
                  <input placeholder='Phone Number' type="number"
                         onChange={(e) => this.setState({phoneNumber: e.target.value})}/>
                </Form.Field>
                <Link to="/imageupload">
                  <Button type='submit' onClick={this.sendToDb} primary>Next</Button>
                </Link>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>

    );
  }
}


export default Dashboard;