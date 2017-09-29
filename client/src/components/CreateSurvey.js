import React, { Component } from 'react';


export default class CreateSurvey extends Component {
    constructor(props) {
        super(props);
        this.state = {
            host_id: props.host_id
        }
    }
    render() {
        console.log('derpinstein')
        return (
            <div>
                <button></button>
            </div>
        )

    }

    _submitSurvey = () => {
        console.log();
    }
}