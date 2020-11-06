import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyDcFq4TwfC-iOu_9RdSY0OrbjNO7ExVojI",
  authDomain: "commission-form-eva.firebaseapp.com",
  databaseURL: "https://commission-form-eva.firebaseio.com",
  projectId: "commission-form-eva",
  storageBucket: "commission-form-eva.appspot.com",
  messagingSenderId: "829563627968",
  appId: "1:829563627968:web:641df1f4535fe20af2c025",
};
const fire = firebase.initializeApp(firebaseConfig);

export default fire;
