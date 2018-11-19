import React, { Component } from 'react';
import { Input,Button,Card,Loader } from 'semantic-ui-react'
import Calendar from 'react-calendar';
import TimePicker from 'react-time-picker';

const CLIENT_ID = 'X33HWKUOQCZ22UYJOHGQPVJ1VEDBD2JLJASKIJ2FLP30WO2J';
const CLIENT_SECRET = '4TL2JERARU1K54RC4CINBGJM0IXA0MCUWOAA1NO0QCUEJPXO';

class MeetScreen extends Component {
  constructor() {
    super();
    this.state = {
      searchTerm: '',
      searchTermArray: [],
      nearByLocations: [],
      locationAdded: false,
      masterObject: {},
      date: new Date(),
      time: '10:00',

    }
    this.searchLocation = this.searchLocation.bind(this);
    this.submitLocation = this.submitLocation.bind(this);
    this.submitLocation2 = this.submitLocation2.bind(this);
    this.submitTimeAndDate = this.submitTimeAndDate.bind(this);
  }

  onChangeCalendar = date => this.setState({ date })
  onChangeTime = time => this.setState({ time })

  
  componentDidMount() {
    const {nearByLocations} = this.state
    const that = this;
    fetch(`https://api.foursquare.com/v2/venues/explore?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=20180323&limit=5&ll=24.865212755046993,67.02500130426029&query=restaurants`)
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      const nearLocations = myJson;
      console.log('nearLocations -->',nearLocations);
      //console.log('nearLocations Places array -->',nearLocations.response.groups.map);
      nearLocations.response.groups.map((value) => {
        value.items.map((innerVal) => {
          nearByLocations.push(innerVal.venue)
          console.log('Inner Val -->',nearByLocations)
          
        })
      })
      that.setState({nearByLocations: nearByLocations})
    });
  }

  searchLocation(e) {
    const {searchTerm} = this.state;
    this.setState({searchTerm: e.target.value})
    fetch(`https://api.foursquare.com/v2/venues/explore?client_id=X33HWKUOQCZ22UYJOHGQPVJ1VEDBD2JLJASKIJ2FLP30WO2J&client_secret=4TL2JERARU1K54RC4CINBGJM0IXA0MCUWOAA1NO0QCUEJPXO&v=20180323&limit=5&ll=24.865212755046993,67.02500130426029&query=${searchTerm}`)
    .then((res) => {
      return res.json()
    })
    .then((res2) => {
      console.log('Search Term -->',res2.response.groups);
      res2.response.groups.map((value) => {
        this.setState({searchTermArray: value.items})
      })
      
    })
    
  }

  submitLocation(index) {
    const {nearByLocations,masterObject} = this.state;
    masterObject.locationName = nearByLocations[index].name;
    console.log('Master Object -->',masterObject);
    this.setState({locationAdded: true})
  }

  submitLocation2(index) {
    const {searchTermArray,masterObject} = this.state;
    masterObject.locationName = searchTermArray[index].venue.name;
    //console.log('Master Object -->',masterObject);
    this.setState({locationAdded: true})
  }
  
  submitTimeAndDate() {
    const {masterObject,date,time} = this.state;
    masterObject.date = date;
    masterObject.time = time;
    masterObject.items = this.props.items;
    console.log('Master Object -->',masterObject)
  }

  render() {
    const {nearByLocations,searchTerm,searchTermArray,locationAdded,time} = this.state
    return (
      locationAdded === false ?
      <div className="App">
        <h1>Meet App Screen</h1>
        <Input focus placeholder='Search Location...' style={{marginBottom: 10}} onChange={(e) => this.searchLocation(e)}/>
        <br/>
        <div style={{ width: '20%',margin: '0 auto',padding: 10}}>
          {!nearByLocations.length ?
          <Card>
            <Card.Content>
              <Card.Header><Loader active/></Card.Header>
              <Card.Description><Loader active/></Card.Description>
            </Card.Content>
          </Card> :
          searchTerm !== "" ?
          searchTermArray.map((value,index) => {
            return <Card>
            <Card.Content>
              <Card.Header>{value.venue.name}</Card.Header>
              <Card.Description>{value.venue.name}</Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Button basic color='green' onClick={() => this.submitLocation2(index)}>
                Submit
              </Button>
            </Card.Content>
          </Card>
          }) :
          nearByLocations.map((value,index) => {
            return <Card>
              <Card.Content>
                <Card.Header>{value.name}</Card.Header>
                <Card.Description>{value.location.address}</Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Button basic color='green' onClick={() => this.submitLocation(index)}>
                  Submit
                </Button>
              </Card.Content>
            </Card>
          })
        }
        </div>
      </div> :
      <div className="App" style={{ width: '30%',margin: '0 auto',padding: 20}}> 
         <div style={{padding: 10}}>
          <TimePicker
            onChange={this.onChangeTime}
            value={this.state.time}
          />
        </div>
        <div style={{paddingBottom: 20}}>
          <Calendar
            onChange={this.onChangeCalendar}
            value={this.state.date}
          />
        </div>
        {time && <Button primary onClick={this.submitTimeAndDate}>Next</Button>}
      </div>
      
    )
  }
}

export default MeetScreen;