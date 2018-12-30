import React, {Component, Fragment} from 'react';
import appStore from '../store/appstore.js';
import { Link } from 'react-router-dom';
import * as remoteActions from '../scripts/remoteActions.js';
import { observer } from 'mobx-react';
import Header from '../components/Header';
import fire from '../scripts/fire.js';

var dB =fire.firestore();
class Home extends Component{

componentDidMount(){
    // remoteActions.setListenerOnAuthChange()
}
checkAndRetrive(){
   dB.collection("users").where("uid", "==", appStore.currentUser.uid)
  .get()
  .then(function(querySnapshot){
    console.log(querySnapshot);
    if(querySnapshot.empty){
      // doc.data() is never undefined for query doc snapshots


  dB.collection("users").add({
    name: appStore.currentUser.displayName,
    uid: appStore.currentUser.uid,
    email: appStore.currentUser.email,
    groups: {}
})
.then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});

    }
    else{

  console.log("Document exists:");

    }


  })

}

    render(){
      return(
        <Fragment>
        <Header/>

            {
              appStore.auth.isLoggedIn ?

                (
                  <Fragment>
                  <br/><br/>
                    <a href="#" data-target="slide-out" class="sidenav-trigger btn">Click to view profile</a>
                    <ul id="slide-out" class="sidenav">
                      <li><div class="user-view">
                        <div class="background">
                          <img src="https://i.ytimg.com/vi/tsjd7xdgfjA/maxresdefault.jpg"/>
                        </div>
                        <a href="#user"><img class="circle" src={appStore.currentUser.photoURL}/></a>
                        <a href="#name"><span class="white-text name">{appStore.currentUser.displayName}</span></a>
                        <a href="#email"><span class="white-text email">{appStore.currentUser.email}</span></a>
                      </div></li>
                      <li>userID:- {appStore.currentUser.uid}</li>
                      <br/><br/>
                      <li><div class="divider"></div></li>
                      <li><a class="sidenav-close green" href="#!">Clicking this will close Sidenav</a></li>
                    </ul>


                                {

                                  this.checkAndRetrive()


                                }

                    {console.log(appStore.currentUser.photoURL)}
                    </Fragment>

                )
              :
                (
                  <Fragment>


                      <div className='row'>

                          <div className="col s12 m6 l3">
                            <div className="card blue-grey darken-1">
                              <div className="card-content white-text">
                                <span className="card-title">Not logged in</span>

                              </div>
                            <div className="card-action">


                          </div>
                         </div>
                        </div>
                    </div>
                    </Fragment>

                )




            }

        </Fragment>
      )
    }
}


export default observer(Home);
