import React, { Component } from 'react';
import firebase from './config/firebase'
import { Link } from 'react-router-dom'
import FileUploader from "react-firebase-file-uploader";

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
      profilePictures: arrToPush
    })
  }

  render() {
    return (
      <div>
        <form>
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
         </form>
         <br/><Link to='options'><button onClick={() => this.uploadImages()}>Next</button></Link>
      </div>
      
    );
  }
}

export default Image;