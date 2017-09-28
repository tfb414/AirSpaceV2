import React, { Component } from 'react';
import './App.css';
import LandingPage from './components/LandingPage'

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
      <div className="App">
        <h1>Host</h1>
        <LandingPage />
      </div>
    );
  }
}

export default App;

//  {this.state.hosts.map(host =>
//           <div key={host.host_id}>{host.first_name} {host.last_name} {host.email}</div>
//         )}