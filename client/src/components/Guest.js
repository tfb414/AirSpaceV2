import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch, NavLink, Redirect } from 'react-router-dom'

import env from '../utility/env';

class Guest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            host_id: 'tfb414@gmail.com',
            guest_id: 'tfb414@gmail.com',
            message: "",
            connectedToHost: '',
            link: "/guest/",

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

                let data = JSON.parse(evt.data)

                console.log("we in message")
                if (data.type === "CONNECTEDTOHOST") {
                    console.log('connected to host')
                    this.setState({
                        connectedToHost: true,
                        message: "connected to host!",

                    })
                    console.log(this.state.connectedToHost)
                }
                if (data.type === "ERROR") {
                    this.setState({
                        message: 'Could not connect to host',

                    })
                }

            };
        }
    }


    render() {
        let redirect = this.state.connectedToHost;
        if (redirect) {
            console.log('redirect is true')
            return <Redirect to='waiting/' />;
        }
        return (
            <div>
                <div>
                    Please enter your hosts email address
                </div>
                <div>
                    <input type='text' value={this.state.host_id} onChange={this.handleChange}></input>
                </div>
                <div>
                    <button onClick={this._submitHost_id}>Submit</button>
                </div>
                <div>
                    Message recieved form backend sir!: {this.state.message}
                </div>

            </div>

        )
    }



    _submitHost_id = () => {
        console.log('submit')
        this._sendMessage(this._createPayload());

    }

    _createPayload = () => {
        console.log('create payload')
        let payload = {
            type: "ADDGUESTTOHOST",
            host_id: this.state.host_id,
            guest_id: this.state.guest_id
        }
        return JSON.stringify(payload);
    }

    _sendMessage = (payload) => {
        console.log('send message')
        this.connection.send(payload);

    }

}
export default Guest