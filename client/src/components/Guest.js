import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch, NavLink, Redirect } from 'react-router-dom'
import guid from 'guid';
import env from '../utility/env';
import GuestWaitingRoom from './GuestWaitingRoom'

class Guest extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         host_id: '',
    //         guest_id: '',
    //         message: ''
    //     }

    // }



    // componentWillMount() {
    //     let id = guid.raw();
    //     let payload = {
    //         type: 'GETUSERID',
    //         id: id
    //     };
    //     this.setState({
    //         guest_id: id
    //     })
    //     this.setState({
    //         guest_id: id
    //     })
    //     this.connection = new WebSocket(env);

    //     // listen to onmessage event
    //     this.connection.onopen = () => {
    //         this._sendMessage(JSON.stringify(payload));
    //         this.connection.onmessage = evt => {
    //             let parsedData = JSON.parse(evt.data);
    //             if (parsedData.type === "CONNECTEDTOHOST") {
    //                 console.log('connected to host')
    //                 this.setState({
    //                     connectedToHost: true,
    //                     message: "connected to host!",

    //                 })
    //                 console.log(this.state.connectedToHost)
    //             }
    //             if (parsedData.type === "ERROR") {
    //                 this.setState({
    //                     message: 'Could not connect to host',

    //                 })
    //             }

    //             if (parsedData.type === 'RETURNUSERID' && parsedData.id === this.state.guest_id) {
    //                 this.setState({
    //                     guest_id: parsedData.user_id
    //                 })
    //             }

    //         };
    //     }
    // }


    render() {
        // console.log(this.state.guest_id);
        // let redirect = this.state.connectedToHost;
        // if (redirect) {
        //     console.log('redirect is true')
        //     return <Redirect to='Waiting/' />;
        // }
        return (
            <div>
                <div>
                    Please enter your hosts email address
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
        console.log(event.target.value);
        // this.setState({
        //     host_id: event.target.value
        // })
        this.props.handleChange(event.target.value)

    }
    // value={this.state.host_id}
    // {this.state.message}
    
    


}
export default Guest