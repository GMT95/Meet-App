import React, { Component } from 'react';
import { Input,Button } from 'semantic-ui-react'

const CLIENT_ID = 'X33HWKUOQCZ22UYJOHGQPVJ1VEDBD2JLJASKIJ2FLP30WO2J';
const CLIENT_SECRET = '4TL2JERARU1K54RC4CINBGJM0IXA0MCUWOAA1NO0QCUEJPXO';

class MeetScreen extends Component {
  constructor() {
    super();
    this.state = {
      searchTerm: ''
    }
  }
  
  componentDidMount() {
    fetch(`https://api.foursquare.com/v2/venues/search?client_id=X33HWKUOQCZ22UYJOHGQPVJ1VEDBD2JLJASKIJ2FLP30WO2J&client_secret=4TL2JERARU1K54RC4CINBGJM0IXA0MCUWOAA1NO0QCUEJPXO&v=20180323&limit=5&ll=24.865212755046993,67.02500130426029&query=restaurants`)
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      console.log(JSON.stringify(myJson));
    });
  }

  

  render() {
    return (
      <div className="App">
        <h1>Meet App Screen</h1>
        <Input focus placeholder='Search Location...' style={{marginBottom: 10}} onChange={(e) => this.setState({searchTerm: e.target.value})}/>
        <br/>
        <Button content='Search' primary />
      </div>
    )
  }
}

export default MeetScreen;