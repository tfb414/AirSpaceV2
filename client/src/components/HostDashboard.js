import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import env from '../utility/env';
import HDNavBar from './HDNavBar'
import CreateSurvey from './CreateSurvey';
import Create from './Create.js';



class HostDashboard extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.connection = new WebSocket(env);
    }

    render() {
        return (

            <BrowserRouter>
                <div>
                    <HDNavBar match={this.props.match} name={['create', 'struff']} />
                    <Switch>
                        <Route path="/host/struff" />
                        <Route path="/host/create" component={() => <CreateSurvey sendMessage={this._sendMessage} />} />
                    </Switch>
                </div>
            </BrowserRouter>

        )
    }
     _sendMessage = (payload) => {
        this.connection.send(payload);

    }

}

export default HostDashboard