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
                <div>
                    <HDNavBar match={this.props.match} name={['create', 'struff']} />
                    <Switch>
                        <Route path="/host/struff" />
                        <Route path="/host/create" component={(host_id) => <CreateSurvey host_id={this.state.host_id} />} />
                    </Switch>
                </div>
            </BrowserRouter>

        )
    }


}

export default HostDashboard