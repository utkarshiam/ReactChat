import React, { Component } from 'react';
import Home from './pages/Home.js';
import createGroup from './pages/createGroup.js'
import {BrowserRouter as Router, Route} from 'react-router-dom';
import 'materialize-css/dist/css/materialize.min.css';
class App extends Component {
  render() {
    return (
      <div>
      <Router>
        <div>
          <Route exact path='/' component={Home}/>
          <Route exact path='/createGroup' component={createGroup}/>
        </div>
      </Router>
      </div>

    );
  }
}

export default App;
