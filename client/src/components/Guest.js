import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'

class Guest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            host_id: "",
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
                    Please enter your hosts email address
                </div>
                <div>
                    <input type='text' value={this.state.host_id} onChange={this.handleChange}></input>
                </div>
                <div>
                    <button onClick={this._submitHost_id}>Submit</button>
                </div>
                <div>
                    Message recieved form backend sir! {this.props.message}
                </div>

            </div>

        )
    }

    _submitHost_id = () => {
        this.props.sendMessage(this._createPayload());
    }

    _createPayload = () => {
        let payload = {
            type: "ADDGUESTTOHOST",
            host_id: this.state.host_id,
            guest_id: this.state.guest_id
        }
        return JSON.stringify(payload);
    }

}

export default Guest