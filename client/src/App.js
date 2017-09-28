import React, { Component } from 'react';
import './App.css';
import LandingPage from './components/LandingPage'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import HostDashboard from "./components/HostDashboard"

class App extends Component {
  state = {
    hosts: [],
    host: {}
  }

  componentWillMount() {
    // fetch('/users')
    //   .then(res => res.json())
    //   .then(host => this.setState({ host }));
  }

  render() {
    return (
      <div className='App'>
        <BrowserRouter>
          <div>
            <Switch>
              <Route exact path="/" component={() => (<LandingPage />)} />
              <Route exact path="/host" component={(match) => (<HostDashboard match={match} />)} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

//  {this.state.hosts.map(host =>
//           <div key={host.host_id}>{host.first_name} {host.last_name} {host.email}</div>
//         )}