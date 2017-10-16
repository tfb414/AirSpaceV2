import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { createArrayOfFirstThings, manageActiveUsers, receivedGuestHeartbeat, displayConnected } from '../utility/activeUsers.js'
import env from '../utility/env';

class HostViewClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            waitingOnData: true,
            activatedMessage: "",
            currentlyConnected: []
        }

        this.createArrayOfFirstThings = createArrayOfFirstThings.bind(this);
        this.manageActiveUsers = manageActiveUsers.bind(this);
        this.receivedGuestHeartbeat = receivedGuestHeartbeat.bind(this);
        this.displayConnected = displayConnected.bind(this);
    }

    componentWillMount() {
        let payload = { type: "REQUESTGUESTS" };
        this.props.sendMessage(JSON.stringify(payload));

        this.props.connection.onmessage = event => {
            let parsedData = JSON.parse(event.data);
            this._receiveMessage(parsedData);
            this.manageActiveUsers();
        }
    }
    componentDidMount() {
        this.requestInterval = setInterval(() => {
            let payload = {
                type: "HEARTBEAT",
            };
            this.props.sendMessage(JSON.stringify(payload));
            let guestPayload = { type: "REQUESTGUESTS" };
            this.props.sendMessage(JSON.stringify(guestPayload));
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.requestInterval);
    }

    render() {
        if (this.state.waitingOnData === true && this.state.activatedMessage !== "") {
            return (
            <div>
                <h3>{this.state.activatedMessage}</h3>
            </div>
            )
        } else if (this.state.waitingOnData === false && this.state.activatedMessage === "") {
            let classList = this.state.results.map((person, idx) => {
            let onlineStatus = this.state.currentlyConnected.filter((status) => {
                return person.guest_id === status[0]
            })
            if (onlineStatus.length === 0) {
                return (
                    <tr>
                        <td scope="row" className="connection offline"><i className="fa fa-circle" aria-hidden="true"></i></td>
                        <td>{person.first_name} {person.last_name}</td>
                        <td>{person.guest_id}</td>
                        <td><button type="button" className="btn btn-outline-secondary" value={person.host_guest_id} onClick={this._deleteGuest}>Remove</button></td>
                    </tr>
                )
            }
            return (
                <tr>
                    <td scope="row" className="connection online" ><i className="fa fa-circle" aria-hidden="true"></i></td>
                    <td>{person.first_name} {person.last_name}</td>
                    <td>{person.guest_id}</td>
                    <td><button type="button" className="btn btn-outline-secondary" value={person.host_guest_id} onClick={this._deleteGuest}>Remove</button></td>
                </tr>
            )

        })
        return (
            <div className="surveyBox SQComponent">
                <h1>Classroom</h1>
                <table className="table table-hover classRoom">
                    <thead>
                        <th> </th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Class Options</th>
                    </thead>
                    <tbody>
                        {classList}
                    </tbody>
                </table>
            </div>
        )
        } else {
            return (
                <div></div>
            );
        }
    }

    _deleteGuest = (event) => {
        let payload = {
            type: "DELETEGUEST",
            host_guest_id: event.target.value
        }
        this.props.sendMessage(JSON.stringify(payload));
        this.props.history.push(`/Host/Your Class`);
    }

    _receiveMessage = (parsedData) => {
        if (parsedData.type === 'DISPLAYGUESTS' && this.props.host_id === parsedData.host_id) {
             if (parsedData.error === null) {
                 this.setState({
                    waitingOnData: false,
                    results: parsedData.payload
                })
             } else {
                 this.setState({
                    activatedMessage: parsedData.error
                })
             }
        }
        if (parsedData.type === 'GUESTHEARTBEATTOHOST' && this.props.host_id === parsedData.host_id) {
            this.receivedGuestHeartbeat(parsedData)
        }
    }

}


export default withRouter(HostViewClass);