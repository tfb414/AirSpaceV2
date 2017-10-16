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
            host_id: localStorage.getItem('host_id'),
            guest_id: '',
            message: '',
            title: localStorage.getItem('title'),
            sqtype: localStorage.getItem('sqtype'),
            sq_id: localStorage.getItem('sq_id'),
            payload: JSON.parse(localStorage.getItem('payload')),
            connection: new WebSocket(env),
            isConnected: false
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

        // listen to onmessage event
        this.state.connection.onopen = () => {
            this.setState({
                isConnected: true
            })
            this._sendMessage(JSON.stringify(payload));
            this.state.connection.onmessage = evt => {
                let parsedData = JSON.parse(evt.data);
                console.log('we got a message in connnect.onopen');
                this._receiveMessage(parsedData);
            };
        }
    }

    render() {
        console.log(this.state.payload);
        console.log(this.state.host_id);
        if (!this.state.isConnected) {
            return (
                <div></div>
            );
        } else {
            return (
                <div>
                    <Switch>
                        <Route
                            exact path='/Guest/'
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
                                    title={this.state.title}
                                    payload={this.state.payload}
                                    sq_id={this.state.sq_id}
                                    sqtype={this.state.sqtype}
                                    sendMessage={this._sendMessage}
                                />
                            )}
                        />
                    </Switch>
                </div>
            );
        }

    }

    _handleChange = (host_id) => {
        localStorage.setItem('host_id', host_id);
        this.setState({ host_id });
    }

    _submitHost_id = () => {
        this._sendMessage(this._createPayload());
    }

    _createPayload = () => {
        let payload = {
            type: "ADDGUESTTOHOST",
            host_id: this.state.host_id
        }
        return JSON.stringify(payload);
    }

    _sendMessage = (payload) => {
        this.state.connection.send(payload);
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

        if (parsedData.type === 'DISPLAYACTIVESQ' && parsedData.host_id === this.state.host_id) {
            console.log('gooot ittt');
            localStorage.setItem('sqtype', parsedData.sqtype);
            localStorage.setItem('sq_id', parsedData.sq_id);
            localStorage.setItem('title', parsedData.title);
            localStorage.setItem('payload', JSON.stringify(parsedData.payload));
            this.setState({
                sqtype: parsedData.sqtype,
                sq_id: parsedData.sq_id,
                title: parsedData.title,
                payload: parsedData.payload
            })
        } 

        if (parsedData.type === 'RECEIVEHEARTBEAT') {
            this._sendMessage(JSON.stringify({
                type: "GUESTHEARTBEAT",
                guest_id: this.state.guest_id,
                host_id: this.state.host_id
            }))
        }
    }
}

export default withRouter(GuestRouter);