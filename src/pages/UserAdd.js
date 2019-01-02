import React, {Component, Fragment} from 'react';
import appStore from '../store/appstore.js';
import { Link } from 'react-router-dom';
import * as remoteActions from '../scripts/remoteActions.js';
import { observer } from 'mobx-react';
import Header1 from '../components/Header1';
import fire from '../scripts/fire.js';
import firebase from 'firebase';
var db =fire.firestore();

class UserAdd extends Component{

  constructor(props){
    super(props)
    this.state=({
      //add shit
      uid:null,
      name:null,
      groupId:null
    })
  }

  grouping(){
    var uid= this.props.match.params.uid;
    var groupId= this.props.match.params.groupId;
    console.log(groupId);


    db.collection("users").where("uid", "==", uid)
    .get()
    .then((querySnapshot)=> {
        querySnapshot.forEach((doc)=> {
            // doc.data() is never undefined for query doc snapshots
            this.setState({
              uid: doc.data().uid,
              name: doc.data().name,

            })
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
  }
kootah(){
  // db.collection("groups").where("uid", "==", uid)
  // .get()
  // .then((querySnapshot)=> {
  //     querySnapshot.forEach((doc)=> {
  //         // doc.data() is never undefined for query doc snapshots
  //         this.setState({
  //           uid: doc.data().uid,
  //           name: doc.data().name,
  //
  //         })
  //     });
  // })
  // .catch(function(error) {
  //     console.log("Error getting documents: ", error);
  // });


}
  componentDidMount(){
         remoteActions.setListenerOnAuthChange()
    }

render(){
  return(

    <Fragment>

      {
          appStore.auth.isLoggedIn ?
          (

                  <Fragment>
                      {
                        this.state.uid? null : this.grouping()

                      }
                      <Header1/>
                      <div class="col s12 white"><h5>Really???? This guy? Your choice SENPAI!</h5></div>
                      &nbsp;
                      <button class="btn waves-effect waves-light center-align" type="submit" name="action" onClick={()=>{this.kootah()}}> add {this.state.name} </button>
                  </Fragment>


          )
            :
          (
              <button class="btn waves-effect waves-light center-align"><Link to='/'><h1> Let's Sign-in First</h1></Link></button>
          )


      }

    </Fragment>


  )
}

}
export default observer(UserAdd)
