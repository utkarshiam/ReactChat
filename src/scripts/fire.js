import firebase from 'firebase';
//<script>
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCit0BN_gLw07kcQSO2wtr_nXoH7S4ju3M",
    authDomain: "rudoc-5ecbd.firebaseapp.com",
    databaseURL: "https://rudoc-5ecbd.firebaseio.com",
    projectId: "rudoc-5ecbd",
    storageBucket: "rudoc-5ecbd.appspot.com",
    messagingSenderId: "500423263056"
  };
  var fire=firebase.initializeApp(config);
  var firestore = fire.firestore();

const settings = {
	timestampsInSnapshots: true,
	}

firestore.settings(settings);
  export default fire;
