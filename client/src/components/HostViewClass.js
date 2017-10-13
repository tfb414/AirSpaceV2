import React, { Component } from 'react';

class HostViewClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            waitingOnData: true,
            activatedMessage: ""
        }
    }

    componentWillMount() {
        let payload = { type: "REQUESTGUESTS" };
        this.props.sendMessage(JSON.stringify(payload));
   
        this.props.connection.onmessage = event => {
            let parsedData = JSON.parse(event.data);
            this._receiveMessage(parsedData);
        }
    }

    render() {
        if (this.state.waitingOnData === true && this.state.activatedMessage !== "") {
            return (
            <div>
            </div>
            );
        } else if (this.state.waitingOnData === false && this.state.activatedMessage === "") {
            let classList = this.state.results.map((person) => {
                return (
                    <tr>
                        <td>{person.first_name}</td>
                        <td>{person.last_name}</td>
                        <td>{person.guest_id}</td>
                        <td><button value={person.host_guest_id} onClick={this._deleteGuest}>Delete</button></td>
                    </tr>
                )});
            return (
                <table>
                    <thead>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                    </thead>
                    <tbody>
                        {classList} 
                    </tbody>
                </table>    
            );
        } else {
            return (
                <div>
                    <h3>{this.state.activatedMessage}</h3>
                </div>
            );
        }
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

    }

}


export default HostViewClass;