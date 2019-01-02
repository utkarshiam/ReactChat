import React, { Component } from 'react';
import Home from './pages/Home.js';
import createGroup from './pages/createGroup.js';
import existingGroups from './pages/existingGroups.js';
import MsgPage from './pages/MsgPage.js';
import AddPar from './pages/AddPar.js';
import UserAdd from './pages/UserAdd.js'
import {BrowserRouter as Router, Route} from 'react-router-dom';
import 'materialize-css/dist/css/materialize.min.css';
import './index.css';
class App extends Component {
  render() {
    return (
      <div>
      <Router>
        <div>
          <Route exact path='/' component={Home}/>
          <Route exact path='/createGroup' component={createGroup}/>
          <Route exact path='/existingGroups' component={existingGroups}/>
          <Route exact path='/MsgPage/:groupId' component={MsgPage}/>
          <Route exact path='/MsgPage/:groupId/AddPar' component={AddPar}/>
          <Route exact path='/MsgPage/:groupId/AddPar/UserAdd/:uid' component={UserAdd}/>
        </div>
      </Router>
      </div>

    );
  }
}

export default App;
