import React, {Component, Fragment} from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import appStore from '../store/appstore';
import { observer } from 'mobx-react';
import M from 'materialize-css/dist/js/materialize.min.js';
import * as remoteActions from '../scripts/remoteActions';
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
    M.AutoInit();
  }
  componentDidUpdate(){
    M.AutoInit()

  }
cool(){
  M.AutoInit();
}

  render(){
    return(
        <div>
        <ul id="dropdown1" class="dropdown-content">
          <li><Link to='/createGroup'> Create Group</Link></li>
          <li><Link to='/existingGroups'>Existing Groups</Link></li>
          <li class="divider"></li>
          </ul>
          <nav>
              <div class="nav-wrapper grey lighten-5">
                <a href="#" class="brand-logo"><font color="green">RuDoc</font></a>
                <ul  class="right">
                  {
                    appStore.auth.isLoggedIn?
                    (
                      <Fragment>
                      {
                        this.cool()
                      }
                        <li><a class="dropdown-trigger green btn" href="#!" data-target="dropdown1">MENU<i class="material-icons right">arrow_drop_down</i></a></li>
                         &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                        <li>
                          <button className='green btn' onClick={remoteActions.signOut}> Sign Out</button>
                        </li>

                        <li>

                          <img style={styles.profile} src={appStore.currentUser.photoURL} class="circle responsive-img"/>
                        </li>
                        <li><button className='btn green'>{appStore.currentUser.displayName}</button></li>
                      </Fragment>
                    ) :
                    (
                        <li>
                          <button className='btn' onClick={remoteActions.signIn}>Sign In</button>
                        </li>
                    )
                  }

                </ul>
              </div>
            </nav>
        </div>


    );
  }
}
export default observer(Header);
