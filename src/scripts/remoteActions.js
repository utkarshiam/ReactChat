import firebase from 'firebase';
import appStore from '../store/appstore';
import fire from './fire.js';

export function signInHelper(){
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then((result)=> {
        // This gives you a Google Access Token. You can use it to access the Google API.
        //var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // console.log(user);
        //this.setState({user})
        // ...
}).catch((error)=> {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
// ...
});
}

export function signIn(){
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then(()=>{
          signInHelper()
        })
}

export function signOut(){
    console.log("YO2")
      firebase.auth().signOut().then(()=> {
      // Sign-out successful.
      console.log("User Signed Out!")
    }).catch((error)=> {
    // An error happened.
    });
}
export function setListenerOnAuthChange(){

        firebase.auth().onAuthStateChanged((user)=> {
        if (user) {
          console.log(user)
          console.log(user.uid)
          appStore.setcurrentUser(user.uid, user.email, user.displayName, user.photoURL);
        } else {
          console.log("Unsetting User!")
          appStore.unsetUser();
        }
        });

}
