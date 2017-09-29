import React, { Component } from 'react';
import './App.css';
import LandingPage from './components/LandingPage'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Websocket from 'react-websocket';

import HostDashboard from "./components/HostDashboard"



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hosts: [],
      host: {},
      messages: []
    }
  }


  componentDidMount() {
    // this is an "echo" websocket service for testing pusposes
    this.connection = new WebSocket('ws://localhost:8080');
    // listen to onmessage event
    this.connection.onopen = () => {
      this.connection.onmessage = evt => {
        // add the new message to state
        this.setState({
          messages: this.state.messages.concat([evt.data])
        })
      };
      setInterval(_ => {
        this.connection.send(Math.random())
      }, 2000)
    }
  }


  render() {
    return (
      <div className='App'>
        <div>
          {this.state.messages.map((msg, idx) => <li key={'msg-' + idx}>{msg}</li>)}
        </div>
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

