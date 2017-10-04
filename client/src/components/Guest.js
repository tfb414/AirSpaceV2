import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch, NavLink } from 'react-router-dom'

import env from '../utility/env';

class Guest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            host_id: '',
            message: ""
        }
    }

    handleChange = (event) => {
        this.setState({ host_id: event.target.value });
    }

    componentWillMount() {

        this.connection = new WebSocket(env);
        console.log(this.connection);
        // listen to onmessage event
        this.connection.onopen = () => {
            this.connection.onmessage = evt => {
                if (evt.data !== "Error") {
                    console.log(evt.data);
                    this.setState({
                        proceed: true

                    })
                } else {
                    this.setState({
                        messages: evt.data,

                    })
                }

            };
        }
    }


    render() {
        return (
            <div>
                <div>
                    Please enter your hosts email address
                </div>
                <div>
                    <input type='text' value={this.state.host_id} onChange={this.handleChange}></input>
                </div>
                <div>
                    <button onClick={this._submitHost_id}></button>
                </div>
                <div>
                    Message recieved form backend sir! {this.state.message}
                </div>

            </div>

        )
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
        this.connection.send(payload);

    }

}
export default Guest