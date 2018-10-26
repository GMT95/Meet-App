import React, { Component } from 'react';
import firebase from '../config/firebase';
import { Link } from 'react-router-dom'
import coffee from '../coffee.jpg'
import cocktail from '../cocktail.jpg';
import juice from '../juice.png';
import {Button, Container, Grid, Image, Checkbox} from "semantic-ui-react";
import swal from 'sweetalert';

const Database = firebase.database();

class Option extends Component {
  constructor(){
    super();
    this.state = {
      coffeeOpt: false,
      juiceOpt: false,
      cocktailOpt: false,
      twenty: false,
      sixty: false,
      oneTwenty: false
    }

    this.submitData = this.submitData.bind(this);
  }

  submitData() {
    const data = this.state;
    const {coffeeOpt, cocktailOpt, juiceOpt, twenty, sixty, oneTwenty} = this.state
    if(coffeeOpt == false && cocktailOpt == false && juiceOpt == false && twenty == false && sixty == false && oneTwenty == false) {
      swal('Please Select an option');
    } else {
      const userId = firebase.auth().currentUser.uid;
      Database.ref(`/options/${userId}`).set({
        data: data
      })

    }
    console.log(data);
  }

  detectChanges(e) {
    console.log(e);
  }

  render()
    {
    const {coffeeOpt,cocktailOpt,juiceOpt,twenty,sixty,oneTwenty} = this.state;
    return (
      <Container>
        <Grid>
          <Grid.Row centered><h2>Select Drink/s</h2></Grid.Row>
          <Grid.Row centered>
              <span><Checkbox onChange={() => this.setState({coffeeOpt: !coffeeOpt})}/></span>
              <Image src={coffee} avatar size='tiny' title='coffee'/>
              <span><Checkbox onChange={() => this.setState({juiceOpt: !juiceOpt})}/></span>
              <Image src={juice} avatar size='tiny'  title='juice'/>
              <span><Checkbox onChange={() => this.setState({cocktailOpt: !cocktailOpt})}/></span>
              <Image src={cocktail} avatar size='tiny'  title='cocktail'/>
          </Grid.Row>
          <Grid.Row centered><h2>Select Meeting Time/s</h2></Grid.Row>
          <Grid.Row centered>
            <Checkbox label="20 min" style={{marginRight: 5}} onChange={() => this.setState({twenty: !twenty})}/>
            <Checkbox label="60 min" style={{marginRight: 5}} onChange={() => this.setState({sixty: !sixty})}/>
            <Checkbox label="120 min" style={{marginRight: 5}} onChange={() => this.setState({oneTwenty: !oneTwenty})}/>
          </Grid.Row>
          <Grid.Row centered>
            {(coffeeOpt || cocktailOpt || juiceOpt) === true && (twenty || sixty || oneTwenty) === true
            && <Link to='map'><Button primary onClick={this.submitData}>Next</Button></Link>}
          </Grid.Row>
        </Grid>
      </Container>

    );
    }
}

export default Option