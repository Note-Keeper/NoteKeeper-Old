import React from 'react'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Notes from './pages/Notes'
import Login from './pages/Login'
import Register from './pages/Register'

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
        <Route path="/register">
          <Register/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App