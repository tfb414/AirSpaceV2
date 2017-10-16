import React, { Component } from 'react';
import { createArrayOfFirstThings, manageActiveUsers, receivedGuestHeartbeat, displayConnected } from '../utility/activeUsers.js'
import env from '../utility/env';

class HostViewClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            waitingOnData: true,
            currentlyConnected: []
        }
        this.connection = new WebSocket(env);

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
            if (parsedData.type === "DISPLAYGUESTS") {
                let results = this._receiveMessage(parsedData);
                console.log(results);
                this.setState({
                    waitingOnData: false,
                    results: results,
                })
            }

            this._receiveMessage(parsedData);
            this.manageActiveUsers();

        }

    }
    componentDidMount() {
        setInterval(() => {
            let payload = {
                type: "HEARTBEAT",
            }
            let JSONpayload = JSON.stringify(payload);
            this.connection.send(JSONpayload);
        }, 1000);
    }

    render() {
        if (this.state.waitingOnData) {
            return (
                <div className="SQComponent">
                </div>
            )
        }

        let classList = this.state.results.map((person, idx) => {
            let onlineStatus = this.state.currentlyConnected.filter((status) => {
                return person.guest_id === status[0]
            })
            console.log(onlineStatus)
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
    }

    _deleteGuest = (event) => {
        let payload = {
            type: "DELETEGUEST",
            host_guest_id: event.target.value
        }
        payload = JSON.stringify(payload);
        this.props.sendMessage(payload);
    }

    _receiveMessage = (parsedData) => {

        if (parsedData.type === 'DISPLAYGUESTS' && this.props.host_id === parsedData.host_id) {
            return parsedData.payload;
        }
        if (parsedData.type === 'GUESTHEARTBEATTOHOST' && this.props.host_id === parsedData.host_id) {
            this.receivedGuestHeartbeat(parsedData)
        }



    }

}


export default HostViewClass;