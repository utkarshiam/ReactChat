import React, {Component, Fragment} from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import appStore from '../store/appstore';
import { observer } from 'mobx-react';
import M from 'materialize-css/dist/js/materialize.min.js';
import * as remoteActions from '../scripts/remoteActions';
import {BrowserRouter as Router, Route} from 'react-router-dom';
const styles={
  profile:{
    width:40,
    height:40,
    margin:10

  }
}
 class Header extends Component {



  state={
    user:null
  }


  componentDidMount(){
    remoteActions.setListenerOnAuthChange();
  }
  componentDidUpdate(){
    M.AutoInit();
  }


  render(){
    return(
        <div>
          <nav>
              <div class="nav-wrapper grey lighten-5">
                <a href="#" class="brand-logo"><font color="green">RuDoc!</font></a>
                <ul id="nav-mobile" class="right">
                  {


                      <Fragment>

                      <li><Link to="/"><i class="large material-icons"><font color="green" size="8">arrow_back</font></i></Link></li>
                      &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                        <li>
                          <button className='btn green' onClick={remoteActions.signOut}> Sign Out</button>
                        </li>

                        <li><button className='btn green'>{appStore.currentUser.displayName}</button></li>

                        <li>

                          <img style={styles.profile} src={appStore.currentUser.photoURL} class="circle responsive-img"/>
                        </li>

                      </Fragment>

                  }

                </ul>
              </div>
            </nav>
        </div>


    );
  }
}
export default observer(Header);
