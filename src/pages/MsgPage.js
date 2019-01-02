import React, {Component, Fragment} from 'react';
import appStore from '../store/appstore.js';
import { Link } from 'react-router-dom';
import * as remoteActions from '../scripts/remoteActions.js';
import { observer } from 'mobx-react';
import Header1 from '../components/Header1';
import fire from '../scripts/fire.js';
import firebase from 'firebase';
var db =fire.firestore();
var count=0;
var t=Math.floor(Math.random() * 10000);
class MsgPage extends Component{
  constructor(props){
    super(props)
    this.state={
      groupId:null,
      groupName: null,
      messages:[],
      newMessage:''
    }
  }

  grouping(){
    var groupId= this.props.match.params.groupId;
    console.log(groupId);

    //IDHAR MID KA PRAYOG HUA
    db.collection("groups").where("gid", "==", groupId)
    .get()
    .then((querySnapshot)=> {
        querySnapshot.forEach((doc)=> {
            // doc.data() is never undefined for query doc snapshots
            this.setState({
              groupId: doc.data().gid,
              groupName: doc.data().name,
              type:""
            })
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
  }
  componentDidUpdate() {
    console.log("Component Did Update!");
  }

  componentDidMount(){
    remoteActions.setListenerOnAuthChange();
  }

handleClick(){
  console.log("hooo")
  var gid= this.props.match.params.groupId;
  var mid= firebase.firestore.FieldValue.serverTimestamp();
  if(this.state.newMessage ==="" && count===0)
  {
    alert
    ("You are too lazy to even write a message. What an asshole!!")
  }
else
  {var msgDict={
    body : this.state.newMessage,
    mid,
    gid,
    uid: appStore.currentUser.uid
  }

//THE adding message GROUP SHIT
if(count===0)
{

  db.collection("messages").add({
  body: msgDict.body,
  mid: msgDict.mid,
  gid: msgDict.gid,
  uid: msgDict.uid
})
.then(function(docRef) {
    console.log("messages written with ID: ", docRef.id);
})
.catch(function(error) {
    console.error("Error adding messages ", error);
});
}

//THE retrieving message GROUP SHIT
  db.collection("messages").where("gid", "==", gid).orderBy("mid")
  .get()
  .then((querySnapshot)=> {
      var arr = []

      querySnapshot.forEach((doc)=> {
          // doc.data() is never undefined for query doc snapshots
          var msggD= doc.data()
          arr.push(msggD)
      });

      this.setState({
        messages: arr,
        newMessage: ""
      });

      console.log(this.state.messages)
  })
  .catch(function(error) {
      console.log("Error getting documents: ", error);
  });

  ///TESTINGGGGGGGGG

  // db.collection("users").where("uid", "==", this.msgDict.uid)
  // .get()
  // .then((querySnapshot)=> {
  //
  //
  //     querySnapshot.forEach((doc)=> {
  //         // doc.data() is never undefined for query doc snapshots
  //         var msggD= doc.data()
  //         arr.push(msggD)
  //     });
  //
  //     this.setState({
  //       messages: arr,
  //       newMessage: ""
  //     });
  //
  //     console.log(this.state.messages)
  // })
  // .catch(function(error) {
  //     console.log("Error getting documents: ", error);
  // });
  //
  //





count=0;}

}

render(){
var gid=this.props.match.params.groupId;
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


                <div class="row">
                  <form class="col s12">
                    <div class="row">
                      <div class="input-field col s12">
                        <input value={this.state.newMessage} id="email"  class="active" onChange={(e)=>{
                          this.setState({
                                newMessage:e.target.value
                              })
                        }}/>

                        <span class="helper-text " data-error="wrong" data-success="right"><font color="green">Write a message</font></span>
                      </div>
                    </div>
                  </form>
                  <ul>

                  <li><Link to={'/MsgPage/'+ gid+ "/AddPar"} ><button class="btn waves-effect waves-light center-align" name="action">Click to add users</button></Link></li>
                  &nbsp;

                  <li><button class="btn waves-effect waves-light center-align" name="action" onClick={()=>{
                    count=1;
                    this.handleClick();
                    this.state.messages.map((m, i)=>{
                    return(
                      <div class="white"><pre key={i}><b>{m.body}</b> by<font color="green"> Random Guy </font></pre></div>
                    )

                  })
                }}> Check previous messages<i class="material-icons right">send</i></button></li>&nbsp;




                  <li><button class="btn waves-effect waves-light center-align" type="submit" name="action" onClick={()=>{this.handleClick()}}>Submit
                  <i class="material-icons right">send</i>
                </button></li>
                {
                  this.state.messages.map((m, i)=>{
                    return(
                      <div class="white"><pre key={i}><b>{m.body}</b> by<font color="green"> Random guy {Math.floor(Math.random() * 10000)}    </font></pre></div>
                    )
                  })
                }
                </ul>
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
export default observer(MsgPage);
