import React, {Component, Fragment} from 'react';
import appStore from '../store/appstore.js';
import { Link } from 'react-router-dom';
import * as remoteActions from '../scripts/remoteActions.js';
import { observer } from 'mobx-react';
import Header1 from '../components/Header1';
import fire from '../scripts/fire.js';
import firebase from 'firebase';
var db =fire.firestore();

class AddPar extends Component{

  constructor(props){
    super(props)
    this.state=({
      Suarr:[]
    })
  }

kootah(){
  db.collection("users")
.get()
.then((querySnapshot)=> {
  var arr=[]

    querySnapshot.forEach((doc)=> {
        // doc.data() is never undefined for query doc snapshots

        var groupDict=doc.data().name
        arr.push(groupDict)

    });
    var s = new Set(arr)
    var newarr=Array.from(s)
    this.setState({
      Suarr: newarr
    });
    console.log(this.state.Suarr)
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
                (
                  <Fragment>
                    <Header1/>
                    {
                        <Fragment>
                          <button class="btn waves-effect waves-light center-align" onClick={()=>{this.kootah()}}> show peeps to add!</button>

                          <ul>
                          {


                            this.state.Suarr.map((m, i)=>{
                              return(
                              <li>  <div class="white"><pre key={i}><b>{m}</b></pre></div></Link></li>
                              )
                            })
                          }
                          </ul>
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
export default observer(AddPar);
