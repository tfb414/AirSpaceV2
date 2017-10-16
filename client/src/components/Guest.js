import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch, NavLink, Redirect } from 'react-router-dom'
import guid from 'guid';
import env from '../utility/env';
import GuestWaitingRoom from './GuestWaitingRoom'

class Guest extends Component {


    render() {

        return (
            <div className='GuestWaitingRoom'>
                <div className='guestPrompt'>
                    Please enter your teacher's email address:
                </div>
                <input type='text' value={this.props.host_id} onChange={this._handleChange}></input>
                <button className='guestButton' onClick={this.props.submitHost_id}>Submit</button>
            </div>

        )
    }


    _handleChange = (event) => {
        this.props.handleChange(event.target.value);
    }


}
export default Guest