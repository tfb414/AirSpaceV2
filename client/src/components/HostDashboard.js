import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import env from '../utility/env';
import { createArrayOfFirstThings, manageActiveUsers, receivedGuestHeartbeat, displayConnected } from '../utility/activeUsers.js'
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
            connection: new WebSocket(env),
            isConnected: false,
            currentlyConnected: []
        }
        this.createArrayOfFirstThings = createArrayOfFirstThings.bind(this);
        this.manageActiveUsers = manageActiveUsers.bind(this);
        this.receivedGuestHeartbeat = receivedGuestHeartbeat.bind(this);
        this.displayConnected = displayConnected.bind(this);
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
        this.state.connection.onopen = () => {
            this.setState({
                isConnected: true
            })
            this._sendMessage(JSON.stringify(payload));

            this.state.connection.onmessage = event => {
                let parsedData = JSON.parse(event.data);
                this._receiveMessage(parsedData);
                this.manageActiveUsers();
            };
        }


    }
  componentDidMount() {
        setInterval(() => {
            let payload = {
                type: "HEARTBEAT",
            }
            let JSONpayload = JSON.stringify(payload);
            this.state.connection.send(JSONpayload);
        }, 1000);
    }

    render() {
        if (!this.state.isConnected) {
            return (
                <div>
                </div>
            );
        } else {
            return (
                <div className="hostDash">
                    <HDNavBar name={['Create', 'Your Surveys', 'Your Quizzes', 'Your Class']} hostid={this.state.host_id}/>
                    <Switch>
                        <Route exact path="/Host/Your Class/" 
                            component={() => (
                                <HostViewClass 
                                    sendMessage={this._sendMessage}                                      connection={this.state.connection} 
                                    host_id={this.state.host_id} 
                                    />)} />
                        
                        
                        
                        <Route exact path="/Host/Your Surveys/" 
                            component={() => (
                                <HostRenderSurvey
                                    sendMessage={this._sendMessage}
                                    connection={this.state.connection}
                                    host_id={this.state.host_id} 
                                    sqtype="survey"
                                />)} />


                        <Route exact path="/Host/Your Quizzes/" 
                            component={() => (
                                <HostRenderSurvey
                                    sendMessage={this._sendMessage} 
                                    connection={this.state.connection}      host_id={this.state.host_id} sqtype="quiz" 
                                />)} />
                        
                        <Route path="/Host/Create" 
                            component={() => (
                                <Create 
                                    sendMessage={this._sendMessage} 
                                />)} />

                        <Route exact path="/Host/Your Surveys/Edit/:id"         
                            component={(match) => (
                                <HostEditSurvey 
                                    sendMessage={this._sendMessage} connection={this.state.connection} 
                                    match={match} 
                                    host_id={this.state.host_id} 
                                    sqtype="survey"
                                />)}/>
                        <Route exact path="/Host/Your Quizzes/Edit/:id"         component={(match) => (
                                <HostEditQuiz 
                                    sendMessage={this._sendMessage} 
                                    connection={this.state.connection} 
                                    match={match} 
                                    host_id={this.state.host_id} sqtype="quiz"
                                />)}/>
                        <Route path="/Host/Your Surveys/:id" 
                            component={(match) => (
                                <HostRenderResults 
                                    sendMessage={this._sendMessage} 
                                    connection={this.state.connection} 
                                    match={match} 
                                    host_id={this.state.host_id} 
                                    sqtype='survey'
                                />)}/>
                        <Route path="/Host/Your Quizzes/:id" 
                            component={(match) => (
                                <HostRenderResults 
                                    sendMessage={this._sendMessage} 
                                    connection={this.state.connection} 
                                    match={match} 
                                    host_id={this.state.host_id} 
                                    sqtype='quiz'
                                />)} />
                    </Switch>
                </div>
            )
        }
    }
    _sendMessage = (payload) => {
        this.state.connection.send(payload);
    }

    _requestHeartbeat = () => {
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
            this.setState({
                host_id: parsedData.user_id
            })
        }
        if (parsedData.type === 'GUESTHEARTBEATTOHOST' && parsedData.id === this.state.host_id) {
            this.receivedGuestHeartbeat(parsedData)
        }

    }
}
export default HostDashboard;