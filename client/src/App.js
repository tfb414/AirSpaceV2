import React, { Component } from 'react';
import LandingPage from './components/LandingPage';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HostDashboard from "./components/HostDashboard";
import env from './utility/env';

import Guest from './components/Guest'
import GuestWaitingRoom from './components/GuestWaitingRoom'

import GuestRenderSurvey from './components/GuestRenderSurvey'
import GuestRenderQuiz from './components/GuestRenderQuiz'
import GuestRouter from './components/GuestRouter'
import HostRenderResults from './components/HostRenderResults'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: ['hey']
    }
  }


  render() {
    return (
      <div className="App">
        {/* <div>
          {this.state.messages.map((msg, idx) => <li key={'msg-' + idx}>{msg}</li>)}
        </div> */}
        <BrowserRouter>
          <div>
            <Switch>
              <Route exact path="/" component={() => (<LandingPage />)} />
              <Route path="/Host/" component={(match) => (<HostDashboard match={match} sendMessage={this._sendMessage} />)} />
              <Route path="/Guest/" component={(match) => (<GuestRouter match={match} sendMessage={this._sendMessage} message={this.state.messages} />)} />
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

// payload={[{ first_name: "Aaron", last_name: "Sosa", question: [{ text: "Do you like Dogs or cats?", response: "Dogs" }, { text: "Are you happy?", response: "Yes"}]}, { first_name: "Tim", last_name: "Brady", question: [{ text: "Do you like Dogs or cats?", response: "Cats" }, { text: "Are you happy?", response: "Yes"}]}]}