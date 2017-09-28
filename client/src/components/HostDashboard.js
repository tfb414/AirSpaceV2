import React, { Component } from 'react';

import HDNavBar from './HDNavBar'
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'


class HostDashboard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            
            <BrowserRouter>
                <div>
                    <HDNavBar match={this.props.match} name={['create', 'struff']} />
                    <Switch>
                        <Route exact path="/host/struff"  />
                        <Route exact path="/host/create"  /> 
                    </Switch>
                </div>
            </BrowserRouter>

            )
    }

}

export default HostDashboard