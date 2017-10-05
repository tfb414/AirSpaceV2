import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import env from '../utility/env';
import HDNavBar from './HDNavBar';
import CreateSurvey from './CreateSurvey';
import Create from './Create.js';
import guid from 'guid';



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
                if (parsedData.type === 'RETURNUSERID' && parsedData.id === this.state.host_id) {
                    this.setState({
                        host_id: parsedData.user_id
                    })
                }
            };
        }
    }

    render() {
      
        return (

            <div className="hostDash">
                <HDNavBar match={this.props.match} name={['Create', 'Your Surveys', 'Your Quizzes', 'View Results']} />
                <Switch>
                    <Route path="/Host/ViewResults/" />
                    <Route path="/Host/Create" component={() => <Create sendMessage={this._sendMessage} />} />
                </Switch>
            </div>

        )
    }
    _sendMessage = (payload) => {
        this.connection.send(payload);
    }

}

export default HostDashboard;