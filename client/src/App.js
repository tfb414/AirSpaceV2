import React, { Component } from 'react';
import LandingPage from './components/LandingPage';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HostDashboard from "./components/HostDashboard";
import env from './utility/env';
import CreateSurvey from './components/CreateSurvey';
import Create from './components/Create.js'
import Guest from './components/Guest'
import GuestWaitingRoom from './components/GuestWaitingRoom'
import CreateQuiz from './components/CreateQuiz'
import GuestRenderSurvey from './components/GuestRenderSurvey'
import GuestRenderQuiz from './components/GuestRenderQuiz'

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
              <Route exact path="/Host/Create/Quiz" component={() => <CreateQuiz sendMessage={this.props.sendMessage} />}/>
              <Route exact path="/Host/Create/Survey" component={() => <CreateSurvey sendMessage={this.props.sendMessage} />} />
              <Route path="/Host/struff/" />
              <Route exact path="/Host/Create/" component={() => <Create match={this.props.match} name={['survey', 'quiz']} sendMessage={this.props.sendMessage} />} />
              <Route exact path="/Host/" component={(match) => (<HostDashboard match={match} sendMessage={this._sendMessage} />)} />
              <Route exact path="/Guest/waiting/" component={(match) => (<GuestWaitingRoom match={match} /*message={this.state.messages} */ />)} />
              <Route exact path="/Guest/" component={(match) => (<Guest match={match} sendMessage={this._sendMessage} message={this.state.messages} />)} />
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

