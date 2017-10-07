import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import GuestRenderSurvey from './GuestRenderSurvey'
import GuestRenderQuiz from './GuestRenderQuiz'

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
            if (this.props.sqtype === "survey") {
                return (
                    <GuestRenderSurvey {... this.props}/>
            )
            } else if (this.props.sqtype === "quiz") {
                console.log('quiz')
                return (
                    <GuestRenderQuiz {... this.props}/>
                )
            }
            
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