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
      Suarr:[],
      groupId:null,
      groupName: null,
    })
  }

  componentDidMount(){
         remoteActions.setListenerOnAuthChange()
    }
kootah(){
  db.collection("users")
.get()
.then((querySnapshot)=> {
  var arr=[]
  var arrId=[]
  var finalArr=[]
  var lamba=0

    querySnapshot.forEach((doc)=> {
        // doc.data() is never undefined for query doc snapshots

        var groupDict=doc.data().name
        var idDict=doc.data().uid
        arr.push(groupDict)
        arrId.push(idDict)
    });
    var s = new Set(arr)
    console.log(arr,s)
    var idset=new Set(arrId)
    var newarr=Array.from(s)//name
    var newIdArr= Array.from(idset)//id

    var result =  newarr.reduce((result, field, index)=> {
      lamba=lamba+1;
      result[newIdArr[index]] = field;
      var key=newIdArr[index]
      var value= field
      var dict={
        [newIdArr[index]]: value
      }
      console.log(key)
        finalArr.push(dict)
        // finalArr.push({result})


      return result;
    }, {})

    console.log(finalArr)
    this.setState({
      Suarr: finalArr
    });

})
.catch(function(error) {
    console.log("Error getting documents: ", error);
});
}


render(){
var gid=this.props.match.params.groupId;
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
                              for(var x in m){
                                var y= m[x]
                                console.log(x)
                              }

                              return(

                              <li><Link to={"/MsgPage/"+gid+"/AddPar/UserAdd/" + x}>  <div class="white"><pre key={i}><b>{y}</b></pre></div></Link></li>
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
