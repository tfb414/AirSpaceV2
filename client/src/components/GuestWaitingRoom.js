import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import GuestRenderSurvey from './GuestRenderSurvey'
import GuestRenderQuiz from './GuestRenderQuiz'

class GuestWaitingRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            host_id: props.host_id,
            title: props.title
        }
    }

    render() {
        if (this.state.title !== null || localStorage.getItem('title') !== null) {
            if (this.props.sqtype === "survey") {
                return (
                    <GuestRenderSurvey onSubmit={() => { this.setState({ title: null }) }} {... this.props} />
                )
            } else if (this.props.sqtype === "quiz") {
                return (
                    <GuestRenderQuiz onSubmit={() => { this.setState({ title: null }) }} {... this.props} />
                )
            }

        }
        return (
            <div className="GuestWaitingRoom">
                <div className="guestPrompt">
                    Welcome to the Guest Waiting Room! We are waiting for your host to send a survey!
                </div>
            </div>

        )

    }

    _onSubmit = () => {
        this.setState({
            title: ""
        })
    }



}




export default GuestWaitingRoom