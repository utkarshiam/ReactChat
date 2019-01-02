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
      uid:null
    })
  }
  grouping(){
    var uid= this.props.match.params.uid;
    console.log(uid);

    //IDHAR MID KA PRAYOG HUA
    // db.collection("groups").where("gid", "==", groupId)
    // .get()
    // .then((querySnapshot)=> {
    //     querySnapshot.forEach((doc)=> {
    //         // doc.data() is never undefined for query doc snapshots
    //         this.setState({
    //           groupId: doc.data().gid,
    //           groupName: doc.data().name,
    //           type:""
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
              <Header1/>
              {
                  <Fragment>
                      {
                        this.state.groupId? null : this.grouping()
                      }
                  </Fragment>
              }
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
