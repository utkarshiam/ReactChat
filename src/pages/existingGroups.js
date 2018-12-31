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

class existingGroups extends Component{

  constructor(props){
    super(props)
    this.state=({
      arr:[]
    })
  }
  componentDidMount(){
         remoteActions.setListenerOnAuthChange()
    }

  showGroups(){
    console.log("hello")

    db.collection("users").where("uid", "==", appStore.currentUser.uid)
    .get()
    .then((querySnapshot)=> {
        querySnapshot.forEach((doc)=> {
            // doc.data() is never undefined for query doc snapshots
            var groupDict= doc.data().groups;
            var arrGroup=[]
            for(var x in groupDict){
              arrGroup.push({
                [x]: groupDict[x]
              })
            }
            this.setState({
              arr: arrGroup
            })
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
  }
  render(){
    return(
      <Fragment>
        {
            appStore.auth.isLoggedIn ?
              ( <Fragment>
                <Header1/>
                <button className='btn green' onClick={()=>{this.showGroups()}}>Click to show existing groups for this user</button>
                <ul class="collection white">
                {
                  this.state.arr.map(function(m, i){

                      for(var x in m){
                        var y= m[x]
                      }
                      return(
                      <li class="collection-item white"><p key={i}><Link to={"/MsgPage/" + x}>  {y}</Link> </p></li>
          )
        })
      }
                </ul></Fragment>
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
export default observer(existingGroups);
