import React from 'react'
import Notes from './components/Notes'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './assets/root.scss';

function App () {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Notes />
        </Route>
        <Route path="/login">
          BCDA
        </Route>
      </Switch>
    </Router>
  );
}

export default App