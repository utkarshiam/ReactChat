import firebase from 'firebase';
//<script>
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCcDUEIrnqahOOV0THtpwnX-jH0YwiJmME",
    authDomain: "whatsapplookalike.firebaseapp.com",
    databaseURL: "https://whatsapplookalike.firebaseio.com",
    projectId: "whatsapplookalike",
    storageBucket: "whatsapplookalike.appspot.com",
    messagingSenderId: "547860398850"
  };
  var fire=firebase.initializeApp(config);
  var firestore = fire.firestore();

const settings = {
	timestampsInSnapshots: true,
	}

firestore.settings(settings);
  export default fire;
