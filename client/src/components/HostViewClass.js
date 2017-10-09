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
                <h1>Searching for you Surveys and Quizzes</h1>
            </div>
            )
        }
    }


     _receiveMessage = (parsedData) => {
        if (parsedData.type === 'DISPLAYSQLIST' && this.props.host_id === parsedData.host_id) {
            return parsedData.payload;
        }

    }

}


export default HostViewClass;