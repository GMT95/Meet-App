import * as firebase from 'firebase';

 // Initialize Firebase
 var config = {
  apiKey: "AIzaSyC_utoe1W2IUOPM--mzsxbMUtIZAy9EegE",
  authDomain: "meetapp-9aa2c.firebaseapp.com",
  databaseURL: "https://meetapp-9aa2c.firebaseio.com",
  projectId: "meetapp-9aa2c",
  storageBucket: "meetapp-9aa2c.appspot.com",
  messagingSenderId: "862496048029"
};
firebase.initializeApp(config);


export default firebase;