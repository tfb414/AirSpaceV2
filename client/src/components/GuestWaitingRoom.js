import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import GuestRenderSurvey from './GuestRenderSurvey'

class GuestWaitingRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            host_id: props.host_id,
            title: ""

        }
    }

    render() {
        if (this.props.title !== "") {
            console.log('here')
            return (
                <GuestRenderSurvey payload={this.props.payload} sq_id={18} title={this.props.title} />
            )
        }
        return (
            <div>
                <div>
                    Welcome to the Guest Waiting Room! We are waiting for your host to send a survey!
                    {this.props.title}
                </div>
            </div>

        )

    }



}




export default GuestWaitingRoom