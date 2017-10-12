import React, { Component } from 'react';
import { createArrayOfFirstThings, manageActiveUsers, receivedGuestHeartbeat, displayConnected } from '../utility/activeUsers.js'


class HostViewClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            waitingOnData: true,
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
            if (parsedData.type === "DISPLAYGUESTS") {
                let results = this._receiveMessage(parsedData);
                console.log(results);

                this.setState({
                    waitingOnData: false,
                    results: results
                })
            }

        }
    }

    render() {
        if (this.state.waitingOnData) {
            return (
                <div>
                    <h1>Searching for your guests</h1>
                </div>
            )
        }

        let classList = this.state.results.map((person, idx) => {
            let status = this.props.currentlyConnected.filter((status) => {
                return person.guest_id === status[0]
            })
            console.log(status);
            console.log('THIS IS ' + status)
            return (
                <tr>
                    <td>{status[0]}</td>
                    <td>{person.first_name}</td>
                    <td>{person.last_name}</td>
                    <td>{person.guest_id}</td>
                    <td><button value={person.host_guest_id} onClick={this._deleteGuest}>Delete</button></td>
                </tr>
            )
        })
        return (
            <div>
                <table>
                    <thead>
                        <th>Online</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                    </thead>
                    <tbody>
                        {classList}
                    </tbody>
                </table>
                <div>{this.displayConnected()}</div>
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


    }

}


export default HostViewClass;