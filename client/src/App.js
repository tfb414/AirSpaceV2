import React, { Component } from 'react';
import LandingPage from './components/LandingPage';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HostDashboard from "./components/HostDashboard";
import env from './utility/env';
import CreateSurvey from './components/CreateSurvey';
import Create from './components/Create.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: ['hey'],
      host_id: 'tfb414@gmail.com'
    }
  }

  componentDidMount() {
    console.log('derp');

    // this is an "echo" websocket service for testing pusposes
    this.connection = new WebSocket(env);
    // listen to onmessage event
    // this.connection.onopen = () => {
    //   this.connection.onmessage = evt => {
    //     // add the new message to state
    //     this.setState({
    //       messages: this.state.messages.concat([evt.data])
    //     })
    //   };
    //   setInterval(_ => {
    //     this.connection.send(Math.random())
    //   }, 2000)
    // }
  }


  render() {
    console.log(this.connection)
    return (
      <div className="App">
        {/* <div>
          {this.state.messages.map((msg, idx) => <li key={'msg-' + idx}>{msg}</li>)}
        </div> */}
        <BrowserRouter>
          <div>
            <Switch>
              <Route exact path="/" component={() => (<LandingPage />)} />
              <Route exact path="/host/" component={(match) => (<HostDashboard match={match} host_id={this.state.host_id} sendMessage={this._sendMessage} />)} />
              <Route path="/host/struff/" />
              <Route path="/host/create/" component={(host_id) => <Create match={this.props.match} name={['survey', 'quiz']} host_id={this.state.host_id} sendMessage={this.props.sendMessage} />} />
              <Route path="/host/quiz" />
              <Route path="/host/survey" component={(host_id) => <CreateSurvey host_id={this.state.host_id} sendMessage={this.props.sendMessage} />} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }

  _sendMessage = (payload) => {
    this.connection.send(payload);

  }

}

export default App;

//  {this.state.hosts.map(host =>
//           <div key={host.host_id}>{host.first_name} {host.last_name} {host.email}</div>
//         )}

