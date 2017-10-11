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
  }


  render() {
    return (
      <div className="App">
        <BrowserRouter>
        <div>
            <Switch>
            <Route exact path="/" component={<LandingPage />} />
            <Route path="/Host/" component={(match) => (<HostDashboard match={match} />)} />
            <Route path="/Guest/" component={(match) => (<GuestRouter match={match} />)} />
            </Switch>
        </div>
        </BrowserRouter>
        </Provider>
      </div>
    );
  }


}

export default App;