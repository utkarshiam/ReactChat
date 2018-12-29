import {observable, decorate, action} from 'mobx';

class AppStore {

  auth = {
    isLoggedIn: false
  }
  currentUser = null
  currentGroups=null
  setcurrentUser(uid, email, displayName, photoURL) {
      this.auth.isLoggedIn = true;
      this.currentUser = {
        uid, email, displayName, photoURL
      }
  }
  setcurrentGroups(gid,name,displayName){

  }
  unsetUser(){
    this.auth.isLoggedIn = false
    this.currentUser = null
  }
}
  decorate(AppStore,{
    auth: observable,
    currentUser: observable,
    setcurrentUser: action,
    unsetUser: action
  })

const appStore= new AppStore();
export default appStore;
