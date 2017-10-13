import React, { Component } from 'react';

class HostViewClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            waitingOnData: true,
        }
    }

    componentWillMount() {
        let payload = { type: "REQUESTGUESTS" };
        this.props.sendMessage(JSON.stringify(payload));
   
        this.props.connection.onmessage = event => {
            let parsedData = JSON.parse(event.data);
            let results = this._receiveMessage(parsedData);
            console.log(results);
            this.setState({
                waitingOnData: false,
                results: results
            })
        }
    }

    render() {
        if (this.state.waitingOnData) {
            return (
            <div>
            </div>
            )
        }
        let classList = this.state.results.map((person) => {
            return (
                <tr>
                    <td>{person.first_name}</td>
                    <td>{person.last_name}</td>
                    <td>{person.guest_id}</td>
                    <td><button value={person.host_guest_id} onClick={this._deleteGuest}>Delete</button></td>
                </tr>
            )
        })
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