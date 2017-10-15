import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch, NavLink, Redirect } from 'react-router-dom'
import guid from 'guid';
import env from '../utility/env';
import GuestWaitingRoom from './GuestWaitingRoom'

class Guest extends Component {


    render() {

        return (
            <div>
                <div>
                    Please enter your host's email address
                </div>
                <div>
                    <input type='text' value={this.props.host_id} onChange={this._handleChange}></input>
                </div>
                <div>
                    <button onClick={this.props.submitHost_id}>Submit</button>
                </div>
                <div>
                    Message recieved form backend sir!:
                </div>

            </div>

        )
    }


    _handleChange = (event) => {
        this.props.handleChange(event.target.value);
    }


}
export default Guest