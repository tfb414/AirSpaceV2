import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {hosts: []}

  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(hosts => this.setState({ hosts }));
  }

  render() {
    return (
      <div className="App">
        <h1>Hosts</h1>
        {this.state.hosts.map(host =>
          <div key={host.host_id}>{host.email}</div>
        )}
      </div>
    );
  }
}

export default App;