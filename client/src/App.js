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

//   componentDidMount() {

    // this is an "echo" websocket service for testing pusposes
    // this.connection = new WebSocket(env);
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
//   }


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
              <Route exact path="/host/" component={(match) => (<HostDashboard match={match} sendMessage={this._sendMessage} />)} />
              <Route path="/host/struff/" />
              <Route path="/host/Create/" component={(host_id) => <Create match={this.props.match} name={['survey', 'quiz']} host_id={this.state.host_id} sendMessage={this.props.sendMessage} />} />
              <Route path="/host/Create/Quiz" component={(host_id) => <CreateQuiz host_id={this.state.host_id} sendMessage={this.props.sendMessage} />}/>
              <Route path="/host/Create/Survey" component={(host_id) => <CreateSurvey host_id={this.state.host_id} sendMessage={this.props.sendMessage} />} />
              <Route exact path="/guest/" component={(match) => (<Guest match={match} guest_id={this.state.guest_id} sendMessage={this._sendMessage} message={this.state.messages} />)} />
              <Route exact path="/guest/waiting/" component={(match) => (<GuestWaitingRoom match={match} guest_id={this.state.guest_id} /*message={this.state.messages} */ />)} />
              <Route exact path="/guest/survey/" component={(match) => (<GuestRenderSurvey survey={{ title: "Survey 1", sq_id: "1" }} payload={[{ question_number: "1", question_id: "1", text: "What is the meaning of life" }, { question_number: "2", question_id: "2", text: "Why are we here?" }]} />)} />
              <Route exact path="/guest/quiz/" component={(match) => (<GuestRenderQuiz quiz={{ title: "Quiz 1", sq_id: "1" }} payload={[{ question_number: "1", question_id: "1", text: "Cat or Dog?", option: [{ text: "Dog", option_id: "1" }, { text: "Cat", option_id: "2" }] }, { question_number: "2", question_id: "2", text: "Zombie or Vampire?", option: [{ text: "Zombie", option_id: "3" }, {text: "Vampire", option_id: "4"}] }]} />)} /> 
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

