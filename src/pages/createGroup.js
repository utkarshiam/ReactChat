import React, {Component, Fragment} from 'react';
import * as remoteActions from '../scripts/remoteActions.js';
import Header1 from '../components/Header1.js';
import { Link } from 'react-router-dom';
import appStore from '../store/appstore.js';
import { observer } from 'mobx-react';
class createGroup extends Component {

  componentDidMount(){
       remoteActions.setListenerOnAuthChange()
  }
  render(){
    return(
      <Fragment>

        {

          appStore.auth.isLoggedIn ?
            (
              <Fragment>
              <Header1/>

                  <h1 align="center" >Create Group!</h1>
                  <br/>
                  <br/>
                  <br/>
                          <div class="row">
                            <form class="col s12">
                              <div class="row">
                                <div class="input-field col s12">
                                  <input id="email" type="email" class="validate"/>
                                  <label for="email"><font color="green">Use your favourite Word</font></label>
                                  <span class="helper-text " data-error="wrong" data-success="right"><font color="green">Group-Name</font></span>
                                </div>
                              </div>
                            </form>
                          </div>

              </Fragment>
            )
          :
            (
                <Link to='/'> Sign-in First</Link>
            )
        }
      </Fragment>

    )
  }

}
export default observer(createGroup);
