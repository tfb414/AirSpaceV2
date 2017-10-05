import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch, NavLink } from 'react-router-dom'
import guid from 'guid';
import env from '../utility/env';

class Guest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            host_id: '',
            guest_id: '',
            message: ''
        }
    }

    handleChange = (event) => {
        this.setState({ host_id: event.target.value });
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
        this.setState({
            guest_id: id
        })
        this.connection = new WebSocket(env);
        
        // listen to onmessage event
        this.connection.onopen = () => {
            this._sendMessage(JSON.stringify(payload));
            this.connection.onmessage = evt => {
                let parsedData = JSON.parse(evt.data);
                if (parsedData.type === "CONNECTEDTOHOST") {
                    console.log('connected to host')
                    this.setState({
                        connectedToHost: true,
                        message: "connected to host!",

                    })
                    console.log(this.state.connectedToHost)
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

            };
        }
    }


    render() {
<<<<<<< HEAD
        console.log(this.state.guest_id);
=======
        let redirect = this.state.connectedToHost;
        if (redirect) {
            console.log('redirect is true')
            return <Redirect to='waiting/' />;
        }
>>>>>>> f3b39df6a5d15db3d0f9ea6d9392268e5f9da73e
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
            host_id: this.state.host_id
        }
        return JSON.stringify(payload);
    }

    _sendMessage = (payload) => {
        console.log('send message')
        this.connection.send(payload);

    }

}
export default Guest