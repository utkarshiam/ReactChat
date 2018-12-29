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
    groups: null
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
cool(){}
    render(){
      return(
        <Fragment>
        <Header/>

            {
              appStore.auth.isLoggedIn ?

                (
                  <Fragment>


                      <div className='row'>

                          <div className="col s12 m6 l3">
                            <div className="card blue-grey darken-1">
                              <div className="card-content white-text">
                                <span className="card-title">If you have logged in, ACCESS:</span>
                                <ol>
                                <li><Link to='/createGroup'> Create Group</Link></li>
                                </ol>
                                {

                                  this.checkAndRetrive()


                                }
                              </div>
                            <div className="card-action">


                          </div>
                         </div>
                        </div>
                    </div>
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
