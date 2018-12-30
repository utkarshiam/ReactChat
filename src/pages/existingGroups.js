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

  render(){
    return(
      <Fragment>
        {
            appStore.auth.isLoggedIn ?
              (
                <Header1/>
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
