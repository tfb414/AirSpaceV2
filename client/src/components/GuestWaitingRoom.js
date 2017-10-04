import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'

class GuestWaitingRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            host_id: props.host_id,
            guest_id: props.guest_id
        }
    }

    handleChange = (event) => {
        this.setState({ host_id: event.target.value });
    }

    render() {
        return (
            <div>
                <div>
                    Welcome to the Guest Waiting Room! We are waiting for your host to send a survey!
                </div>
                <div>

                </div>

            </div>

        )
    }

}

export default GuestWaitingRoom