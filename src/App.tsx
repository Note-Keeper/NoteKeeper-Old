import React from 'react'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Notes from './pages/Notes'
import Login from './pages/Login'

import './assets/root.scss';

function App () {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Notes />
        </Route>
        <Route path="/login">
          <Login/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App