import React, {Component, Fragment} from 'react';
import * as remoteActions from '../scripts/remoteActions.js';
import Header1 from '../components/Header1.js';
import { Link } from 'react-router-dom';
import appStore from '../store/appstore.js';
import { observer } from 'mobx-react';
import M from 'materialize-css/dist/js/materialize.min.js';
import fire from '../scripts/fire.js';
import randomstring from 'randomstring';
var db =fire.firestore();
class createGroup extends Component {

  constructor(props){
    super(props)
    this.state={
      groupName:null,

    }
  }
  handleClick(){
    var groupName= this.state.groupName;
    console.log("chutiya" + groupName);
    var groupId= randomstring.generate();


      db.collection("users").where("uid", "==", appStore.currentUser.uid)
    .get()
    .then(function(querySnapshot) {

        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            var dId= doc.id
            var groupDict=doc.data().groups
            groupDict[groupId]= groupName


            var washingtonRef = db.collection("users").doc(dId);

            // Set the "capital" field of the city 'DC'
          washingtonRef.update({
                groups: groupDict

              });
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });




       // doc.data() is never undefined for query doc snapshots


   db.collection("groups").add({
     gid: groupId,
     name: groupName,
     users: {
       [appStore.currentUser.uid] : appStore.currentUser.displayName
     }
 })
 .then(function(docRef) {
     console.log("Document written with ID: ", docRef.id);
 })
 .catch(function(error) {
     console.error("Error adding document: ", error);
 });

 this.setState({
   groupName: ""
 })

}

componentDidMount(){
       remoteActions.setListenerOnAuthChange()
  }
  componentDidUpdate(){
    M.AutoInit();
    M.updateTextFields();
  }
  render(){
    return(
      <Fragment>

        {

          appStore.auth.isLoggedIn ?
            (
              <Fragment>
              <Header1/>


                  <span class="white-text name"><h1>Create Group!</h1></span>

                  <br/>
                  <br/>
                  <br/>
                          <div class="row">
                            <form class="col s12">
                              <div class="row">
                                <div class="input-field col s12">
                                  <input value={this.state.groupName} id="email"  class="active" onChange={(e)=>{
                                    this.setState({
                                      groupName: e.target.value
                                    })
                                  }}/>
                                  <label class="active"><font color="green">Use your favourite Word</font></label>
                                  <span class="helper-text " data-error="wrong" data-success="right"><font color="green">Group-Name</font></span>
                                </div>
                              </div>
                            </form>
                            <button class="btn waves-effect waves-light center-align" type="submit" name="action" onClick={()=>{this.handleClick()}}>Submit
                            <i class="material-icons right">send</i>
                          </button>
                          </div>


              </Fragment>
            )
          :
            (
                <Link to='/'><h1> Let's Sign-in First</h1></Link>
            )
        }
      </Fragment>

    )
  }

}
export default observer(createGroup);
