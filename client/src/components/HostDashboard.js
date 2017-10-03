import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'

import HDNavBar from './HDNavBar'
import CreateSurvey from './CreateSurvey'


class HostDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            host_id: props.host_id
        }
    }

    render() {
        return (

            <BrowserRouter>
                <div className="hostDash">
                    <HDNavBar match={this.props.match} name={['Create', 'Your Surveys', 'Your Quizzes', 'View Results']} />
                    <Switch>
                        <Route path="/host/viewResults" />
                        <Route path="/host/create" component={(host_id) => <CreateSurvey host_id={this.state.host_id} sendMessage={this.props.sendMessage} />} />
                    </Switch>
                </div>
            </BrowserRouter>

        )
    }


}

export default HostDashboard;