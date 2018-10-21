import * as firebase from 'firebase';

  // Initialize Firebase
var config = {
    apiKey: "AIzaSyBnwBYssqf0_ZsE4LjYZomP6Q3w5WmjRMU",
    authDomain: "react-firebase-starter-75a39.firebaseapp.com",
    databaseURL: "https://react-firebase-starter-75a39.firebaseio.com",
    projectId: "react-firebase-starter-75a39",
    storageBucket: "react-firebase-starter-75a39.appspot.com",
    messagingSenderId: "256612720078"
};
  
firebase.initializeApp(config);

export default firebase;