import React, {Component, Fragment} from 'react';
import appStore from '../store/appstore.js';
import { Link } from 'react-router-dom';
import * as remoteActions from '../scripts/remoteActions.js';
import { observer } from 'mobx-react';
import Header1 from '../components/Header1';
import fire from '../scripts/fire.js';
import firebase from 'firebase';


class AddPar extends Component{
// kootah(){
//   function listAllUsers(nextPageToken) {
//   // List batch of users, 1000 at a time.
//   admin.auth().listUsers(1000, nextPageToken)
//     .then(function(listUsersResult) {
//       listUsersResult.users.forEach(function(userRecord) {
//         console.log("user", userRecord.toJSON());
//       });
//       if (listUsersResult.pageToken) {
//         // List next batch of users.
//         listAllUsers(listUsersResult.pageToken)
//       }
//     })
//     .catch(function(error) {
//       console.log("Error listing users:", error);
//     });
// }
// // Start listing users from the beginning, 1000 at a time.
// listAllUsers();
// }
render(){
  return(

          <Fragment>

            {
                appStore.auth.isLoggedIn ?
                (
                  <Fragment>
                    <Header1/>
                    {

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
