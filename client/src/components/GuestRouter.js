import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch, NavLink, Redirect } from 'react-router-dom'
import { withRouter } from 'react-router';
import guid from 'guid';
import env from '../utility/env';
import GuestWaitingRoom from './GuestWaitingRoom'
import Guest from './Guest'

class GuestRouter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            host_id: '',
            guest_id: '',
            message: ''
        }

    }

    componentWillMount() {
        let id = guid.raw();
        let payload = {
            type: 'GETUSERID',
            id: id
        };
        this.setState({
            guest_id: id
        })

        this.connection = new WebSocket(env);

        // listen to onmessage event
        this.connection.onopen = () => {
            this._sendMessage(JSON.stringify(payload));
            this.connection.onmessage = evt => {
                let parsedData = JSON.parse(evt.data);
                this._receiveMessage(parsedData)


            };
        }
    }

    render() {


        return (
            <div>
                <Switch>
                    <Route
                        exact
                        path='/Guest/'
                        render={() => (
                            <Guest
                                handleChange={this._handleChange}
                                submitHost_id={this._submitHost_id}
                                host_id={this.state.host_id}
                            />
                        )}
                    />
                    <Route
                        path="/Guest/Waiting/"
                        render={() => (
                            <GuestWaitingRoom
                                host_id={this.state.host_id}
                            />
                        )}
                    />
                </Switch>
            </div>
        )

    }

    _handleChange = (host_id) => {
        this.setState({ host_id });
    }

    _submitHost_id = () => {
        // this.setState({host_id})
        this._sendMessage(this._createPayload());

    }

    _createPayload = () => {
        console.log('create payload')
        let payload = {
            type: "ADDGUESTTOHOST",
            host_id: this.state.host_id
        }
        return JSON.stringify(payload);
    }

    _sendMessage = (payload) => {
        console.log('send message')
        this.connection.send(payload);
    }

    _receiveMessage = (parsedData) => {
        if (parsedData.type === "CONNECTEDTOHOST") {
            console.log('connected to host')
            this.setState({
                connectedToHost: true,
                message: "connected to host!",

            })

            this.props.history.push('/Guest/Waiting/');
        }
        if (parsedData.type === "ERROR") {
            this.setState({
                message: 'Could not connect to host',

            })
        }

        if (parsedData.type === 'RETURNUSERID' && parsedData.id === this.state.guest_id) {
            this.setState({
                guest_id: parsedData.user_id
            })
        }
    }
}

export default withRouter(GuestRouter);