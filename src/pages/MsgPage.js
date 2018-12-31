import React, {Component, Fragment} from 'react';
import appStore from '../store/appstore.js';
import { Link } from 'react-router-dom';
import * as remoteActions from '../scripts/remoteActions.js';
import { observer } from 'mobx-react';
import Header1 from '../components/Header1';
import fire from '../scripts/fire.js';

var db =fire.firestore();
class MsgPage extends Component{
  constructor(props){
    super(props)
    this.state={
      groupId:null,
      groupName: null
    }
  }

  grouping(){
    var groupId= this.props.match.params.groupId;
    console.log(groupId);
    db.collection("groups").where("gid", "==", groupId)
    .get()
    .then((querySnapshot)=> {
        querySnapshot.forEach((doc)=> {
            // doc.data() is never undefined for query doc snapshots
            this.setState({
              groupId: doc.data().gid,
              groupName: doc.data().name
            })
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
  }
componentDidMount(){
  remoteActions.setListenerOnAuthChange();
}

render(){
  return(
      <Fragment>
        {
            appStore.auth.isLoggedIn ?
            (
              <Fragment>
              {
                this.state.groupId? null : this.grouping()
              }
                <Header1/>
                <div class="col s12 white"><h1>{this.state.groupName}</h1></div>
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
export default observer(MsgPage);
