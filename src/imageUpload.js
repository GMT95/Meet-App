import React,{ Component } from 'react';
import firebase from './config/firebase'
import FileInput from 'simple-react-file-uploader';
 
class Image extends Component {
 
    
    fileUpload(e) {
        e.map((value) => {
            const storageRef = firebase.storage().ref('profilePicture/' + value.name);
            storageRef.put(value.name)
            console.log(value.name)
        })

        
    }
    
 
    render() {
        return (
            <FileInput 
      multiple={true}
      onChange = {(e) => this.fileUpload(e)}
      accept="image/*"
    />
        );
    }
}

export default Image;