import React, { Component } from 'react';


export default class CreateSurvey extends Component {
    constructor(props) {
        super(props);
        this.state = {
            host_id: props.host_id,
            title: ""
        }

    }

    handleChange = (event) => {
        this.setState({ title: event.target.value });
    }

    render() {
        return (
            <div>
                <input type='text' value={this.state.title} onChange={this.handleChange}></input>
                <button onClick={this._submitSurvey}>Submit</button>
            </div >
        )

    }

    _submitSurvey = () => {
        this.props.sendMessage(this._createPayload());
    }

    _createPayload = () => {
        let payload = {
            type: 'CREATESURVEY',
            payload: {
                host_id: this.state.host_id,
                title: this.state.title
            }
        }
        return JSON.stringify(payload);


    }
}