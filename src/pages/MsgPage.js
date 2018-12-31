import React, {Component, Fragment} from 'react';
import appStore from '../store/appstore.js';
import { Link } from 'react-router-dom';
import * as remoteActions from '../scripts/remoteActions.js';
import { observer } from 'mobx-react';
import Header1 from '../components/Header1';
import fire from '../scripts/fire.js';

var dB =fire.firestore();
class MsgPage extends Component{

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
                <Header1/>
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
