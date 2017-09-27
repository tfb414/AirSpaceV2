import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
      hosts: [],
      host: {}
}

  componentWillMount() {
    fetch('/users')
      .then(res => res.json())
      .then(host => this.setState({ host }));
  }

  render() {
    return (
      <div className="App">
        <h1>Host</h1>
        <div key={this.state.host.host_id}>{this.state.host.first_name} {this.state.host.last_name} {this.state.host.email}</div>
      </div>
    );
  }
}

export default App;

//  {this.state.hosts.map(host =>
//           <div key={host.host_id}>{host.first_name} {host.last_name} {host.email}</div>
//         )}