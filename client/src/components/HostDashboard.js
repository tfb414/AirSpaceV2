import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import env from '../utility/env';
import HDNavBar from './HDNavBar';
import CreateSurvey from './CreateSurvey';
import Create from './Create.js';
import HostRenderSurvey from './HostRenderSurvey'
import guid from 'guid';
import HostRenderResults from './HostRenderResults';
import ActivateSurvey from './ActivateSurvey'



class HostDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            host_id: "",
            surveyResults: [{ text: "Survey 1", sq_id: "" }, { text: "Survey 2", sq_id: "2" }],
            quizResults: [{ text: "Quiz 1", sq_id: "18" }, { text: "Quiz 2", sq_id: "18" }]
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

            };
        }
    }

    render() {

        return (

            <div className="hostDash">
                <HDNavBar name={['Create', 'Your Surveys', 'Your Quizzes']} />
                <Switch>
                    <Route exact path="/Host/Your Surveys/" component={(match) => <HostRenderSurvey sendMessage={this._sendMessage} match={match} connection={this.connection} host_id={this.state.host_id} type="survey"/>} />
                    <Route exact path="/Host/Your Quizzes/" component={(match) => <HostRenderSurvey sendMessage={this._sendMessage} match={match} connection={this.connection} host_id={this.state.host_id} type="quiz"/>} />
                    <Route path="/Host/Create" component={() => <Create sendMessage={this._sendMessage} />} />
                    <Route path="/Host/Your Surveys/:id" component={(match) => <HostRenderResults sendMessage={this._sendMessage} connection={this.connection} match={match} host_id={this.state.host_id} />}/>
                    <Route path="/Host/Your Quizzes/:id" component={(match) => <HostRenderResults sendMessage={this._sendMessage}connection={this.connection} match={match} host_id={this.state.host_id} />}/>
                </Switch>
            </div>

        )
    }
    _sendMessage = (payload) => {
        this.connection.send(payload);
    }

    _receiveMessage = (parsedData) => {
        if (parsedData.type === 'RETURNUSERID' && parsedData.id === this.state.host_id) {
            this.setState({
                host_id: parsedData.user_id
            })
        } else if (parsedData.type === 'DISPLAYSURVEY' && parsedData.id === this.state.host_id) {
            this.setState({
                surveyResults: parsedData.payload.payload
            })
        } else if (parsedData.type === 'DISPLAYQUIZ' && parsedData.id === this.state.host_id) {
            this.setState({
                quizResults: parsedData.payload.payload
            })
        }

    }


}

export default HostDashboard;
   {/* <button onClick={this._createSurveyPayload}>Activate survey</button> */}