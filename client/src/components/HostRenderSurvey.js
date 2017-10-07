import React, { Component } from 'react';
import { withRouter } from 'react-router'
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import HostRenderResults from './HostRenderResults'

class HostRenderSurvey extends Component {
    constructor(props) {
        super(props);
        this.state = {
            waitingOnData: true,
        }
    }

    componentWillMount() {
        let payload = { type: "REQUESTSQLIST", sqtype: this.props.sqtype };
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
        let surveys = this.state.results.map((data) => {
            return (
                <div>
                    <h1>{data.sq_name}</h1><button value={data.sq_id} onClick={this._viewResults}>View Results</button><button value={data.sq_id} onClick={this._createSurveyPayload}>Activate</button>
                </div>    
            )
        })
        return (
            <div>
                {surveys}
            </div>
        );
    }

    _viewResults = (event) => {
        console.log('hello')
        if (this.props.sqtype === 'survey') {
            this.props.history.push(`/Host/Your Surveys/${event.target.value}`)
        } else if (this.props.sqtype === 'quiz') {
            this.props.history.push(`/Host/Your Quizzes/${event.target.value}`)
        }

    }

    _createSurveyPayload = (event) => {
        let payload = {
            type: "ACTIVATESQ",
            sqtype: this.props.sqtype,
            sq_id: event.target.value
        }
        payload = JSON.stringify(payload);
        this.props.sendMessage(payload);
    }

     _receiveMessage = (parsedData) => {
        if (parsedData.type === 'DISPLAYSQLIST' && this.props.host_id === parsedData.host_id) {
            return parsedData.payload;
        }

    }

}


export default withRouter(HostRenderSurvey);