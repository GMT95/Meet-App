import React, { Component } from 'react';
import firebase from '../config/firebase'
import { Link } from 'react-router-dom'
import FileUploader from "react-firebase-file-uploader";
//import {Grid} from "semantic-ui-react/dist/commonjs/collections/Grid/Grid";
//import {Form} from "semantic-ui-react/dist/commonjs/collections/Form/Form";
import {Button, Container, Grid, Form} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';

const Database = firebase.database();
class Image extends Component {
  state = {
    username: "",
    avatar: "",
    isUploading: false,
    progress: 0,
    avatarURL: []
  };

  handleChangeUsername = event =>
    this.setState({ username: event.target.value });
  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  handleProgress = progress => this.setState({ progress });
  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };
  handleUploadSuccess = filename => {
    this.setState({ avatar: filename, progress: 100, isUploading: false });
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then(url => this.state.avatarURL.push(url));
  };

  uploadImages() {
    const arrToPush = this.state.avatarURL
    const userId = firebase.auth().currentUser.uid;
    Database.ref(`/profileImages/${userId}`).push({
      profilePictures: arrToPush,
      uid: firebase.auth().currentUser.uid
    })
  }

  render() {
    return (

        <Container>
          <Grid>
            <Grid.Row centered>
              <Grid.Column width={6}>
                <Form>
                  {this.state.isUploading && <p>Progress: {this.state.progress}</p>}


                      <FileUploader
                        accept="image/*"
                        name="avatar"
                        randomizeFilename
                        storageRef={firebase.storage().ref("images")}
                        onUploadStart={this.handleUploadStart}
                        onUploadError={this.handleUploadError}
                        onUploadSuccess={this.handleUploadSuccess}
                        onProgress={this.handleProgress}
                        multiple
                      />
                      <Link to='options'><Button primary onClick={() => this.uploadImages()}>Next</Button></Link>


                </Form>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
        // <p>jgjgjgjgj</p>


      
    );
  }
}

export default Image;