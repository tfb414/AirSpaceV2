import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'

class GuestWaitingRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            host_id: props.host_id
        }
    }



    render() {
        console.log(this.props.title);
        console.log(this.props.payload);
        return (
            <div>
                <div>
                    Welcome to the Guest Waiting Room! We are waiting for your host to send a survey!
                </div>
                <div>
                    {this.props.host_id} please derping work
                    {this.props.title}
                    {this.props.payload}
                </div>
            </div>

        )
    }

}

export default GuestWaitingRoom