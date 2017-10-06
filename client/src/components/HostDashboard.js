import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import env from '../utility/env';
import HDNavBar from './HDNavBar';
import CreateSurvey from './CreateSurvey';
import Create from './Create.js';
import guid from 'guid';
import HostRenderResults from './components/HostRenderResults';



class HostDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            host_id: ""
        }
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
        this.connection = new WebSocket(env);
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
                <HDNavBar name={['Create', 'Your Surveys', 'Your Quizzes', 'Results']} />
                <Switch>
                    <Route path="/Host/Results" component={HostRenderResults} />
                    <Route path="/Host/Create" component={() => <Create sendMessage={this._sendMessage} />} />
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
        }

    }

}

export default HostDashboard;