import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import env from '../utility/env';
import HDNavBar from './HDNavBar';
import CreateSurvey from './CreateSurvey';
import Create from './Create.js';
import HostRenderSurvey from './HostRenderSurvey';
import guid from 'guid';
import HostRenderResults from './HostRenderResults';
import ActivateSurvey from './ActivateSurvey';
import HostEditSurvey from './HostEditSurvey';
import HostEditQuiz from './HostEditQuiz';
import HostViewClass from './HostViewClass';


class HostDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            host_id: "",
            surveyResults: [{ text: "Survey 1", sq_id: "" }, { text: "Survey 2", sq_id: "2" }],
            quizResults: [{ text: "Quiz 1", sq_id: "18" }, { text: "Quiz 2", sq_id: "18" }],
            currentlyConnected: [],
            time: new Date()
        }
        this.connection = new WebSocket(env);
    }
    componentWillMount() {
        let id = guid.raw();
        let payload = {
            type: 'GETUSERID',
            id: id
        };
        this.setState({
            host_id: id
        })
        this.connection.onopen = () => {
            this._sendMessage(JSON.stringify(payload));

            this.connection.onmessage = event => {
                let parsedData = JSON.parse(event.data);
                this._receiveMessage(parsedData);
                this._manageActiveUsers();


            };
        }
        setInterval(() => {
            let payload = {
                type: "HEARTBEAT",
            }
            let JSONpayload = JSON.stringify(payload);
            this.connection.send(JSONpayload);
        }, 1000);


    }

    // componentDidMount() {

    // }



    render() {

        return (

            <div className="hostDash">
                <HDNavBar name={['Create', 'Your Surveys', 'Your Quizzes', 'Your Class']} />
                <Switch>
                    <Route exact path="/Host/Your Class/" component={() => <HostViewClass sendMessage={this._sendMessage} connection={this.connection} host_id={this.state.host_id} />} />
                    <Route exact path="/Host/Your Surveys/" component={(match) => <HostRenderSurvey sendMessage={this._sendMessage} match={match} connection={this.connection} host_id={this.state.host_id} sqtype="survey" />} />
                    <Route exact path="/Host/Your Quizzes/" component={(match) => <HostRenderSurvey sendMessage={this._sendMessage} match={match} connection={this.connection} host_id={this.state.host_id} payload={this.state.payload} sqtype="quiz" />} />
                    <Route path="/Host/Create" component={() => <Create sendMessage={this._sendMessage} />} />

                    <Route exact path="/Host/Your Surveys/Edit/:id" component={(match) => <HostEditSurvey sendMessage={this._sendMessage} connection={this.connection} match={match} host_id={this.state.host_id} sqtype="survey"/>}/>
                    <Route exact path="/Host/Your Quizzes/Edit/:id" component={(match) => <HostEditQuiz sendMessage={this._sendMessage} connection={this.connection} match={match} host_id={this.state.host_id} sqtype="quiz"/>}/>
                    <Route path="/Host/Your Surveys/:id" component={(match) => <HostRenderResults sendMessage={this._sendMessage} connection={this.connection} match={match} host_id={this.state.host_id} sqtype='survey'/>}/>
                    <Route path="/Host/Your Quizzes/:id" component={(match) => <HostRenderResults sendMessage={this._sendMessage} connection={this.connection} match={match} host_id={this.state.host_id} sqtype='quiz'/>} />
                </Switch>
                {/* <div className="Greeting"> */}
                    {/* <div>
                        <h1 className="HDGreeting">Hello, Aaron Sosa</h1>
                        <h3 className="HDGreeting">TeacherID: {this.state.host_id}</h3>
                        <h6 className="HDGreeting">{(this.state.time).toLocaleTimeString('en-US')}</h6>
                    </div>     */}
                    {/* {this._displayConnected()} */}
                {/* </div> */}
            </div>

        )
    }
    _sendMessage = (payload) => {
        this.connection.send(payload);
    }

    _requestHeartbeat = () => {
        console.log('heartbeat')
        let payload = {
            type: "HEARTBEAT",
        }
        this._sendMessage(payload)
    }

    _whatTime = () => {
        let time = (this.state.time).toLocaleTimeString('en-US')
        console.log(time)
        if (time[0] === 1 && time[1] !== ":") {
            time.splice(5, 3)
            console.log(time)
            return time
        }
        time.splice(4, 3)
        console.log(time)
        return time
    }

    _receiveMessage = (parsedData) => {
        if (parsedData.type === 'RETURNUSERID' && parsedData.id === this.state.host_id) {
            console.log(parsedData);
            this.setState({
                host_id: parsedData.user_id
            })
        }
        if (parsedData.type === 'GUESTHEARTBEATTOHOST') {
            this._receivedGuestHeartbeat(parsedData)
        }

    }


    _createArrayOfFirstThings = (array, number) => {
        return array.map((thing) => {
            return thing[number];
        })
    }

    _manageActiveUsers = () => {
        let currentCount = this.state.currentlyConnected.filter((guest) => {
            guest[1] -= 1;
            return guest[1] > 0
        })
        console.log(currentCount)
        this.setState({
            currentlyConnected: currentCount
        })
    }

    _receivedGuestHeartbeat(parsedData) {
        var currentlyConnected = this.state.currentlyConnected
        let arrayOfFirstThings = this._createArrayOfFirstThings(currentlyConnected, 0)
        if (arrayOfFirstThings.indexOf(parsedData.guest_id) < 0) {
            currentlyConnected.push([parsedData.guest_id, 3])
            this.setState({
                currentlyConnected: currentlyConnected
            })
        }
        else {
            currentlyConnected[arrayOfFirstThings.indexOf(parsedData.guest_id)][1] = 3
            this.setState({
                currentlyConnected: currentlyConnected
            })
        }
    }

    _displayConnected = () => {
        return this.state.currentlyConnected.map((guest) => {
            return (
                <div>
                    {guest[0]} Timer: {guest[1]}
                </div>
            )
        })
    }

}

export default HostDashboard;
{/* <button onClick={this._createSurveyPayload}>Activate survey</button> */ }
