import React, { Component } from 'react';
import { withRouter } from 'react-router'
import HostRenderResults from './HostRenderResults'
import ActivateSurvey from './ActivateSurvey.js'

class HostRenderSurvey extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activatedMessage: "",
            waitingOnData: true
        }
    }

    componentWillMount() {
        let payload = { type: "REQUESTSQLIST", sqtype: this.props.sqtype };
        this.props.sendMessage(JSON.stringify(payload));
   
        this.props.connection.onmessage = event => {
            let parsedData = JSON.parse(event.data);
            this._receiveMessage(parsedData);
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
                    <h1>{data.sq_name}</h1><button value={data.sq_id} onClick={this._viewResults}>View Results</button><button value={data.sq_id} onClick={this._createSurveyPayload}>Activate</button><button value={data.sq_id} onClick={this._editSQ}>Edit</button><button value={data.sq_id} onClick={this._deleteSQ}>Delete</button>
                </div>    
            )
        })
        return (
            <div>
                <ActivateSurvey message={this.state.activatedMessage} />
                {surveys}
            </div>
        );
    }

    componentDidMount() {
        setTimeout(
            this.setState({
            activatedMessage: ""
        ) }, 2000)
    }

    _viewResults = (event) => {
        if (this.props.sqtype === 'survey') {
            this.props.history.push(`/Host/Your Surveys/${event.target.value}`)
        } else if (this.props.sqtype === 'quiz') {
            this.props.history.push(`/Host/Your Quizzes/${event.target.value}`)
        }

    }

    _editSQ = (event) => {
        if (this.props.sqtype === 'survey') {
            this.props.history.push(`/Host/Your Surveys/Edit/${event.target.value}`)
        } else if (this.props.sqtype === 'quiz') {
            this.props.history.push(`/Host/Your Quizzes/Edit/${event.target.value}`)
        }
    }

    _deleteSQ = (event) => {
        let payload = {
            type: "DELETESQ",
            sq_id: event.target.value
        }
        payload = JSON.stringify(payload);
        this.props.sendMessage(payload);
        if (this.props.sqtype === 'survey') {
            this.props.history.push(`/Host/Your Surveys`)
        } else if (this.props.sqtype === 'quiz') {
            this.props.history.push(`/Host/Your Quizzes`)
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
            let results = parsedData.payload;
            console.log(results);
            this.setState({
                waitingOnData: false,
                results: results
            })
        } else if (parsedData.type === "ACTIVATEDSQ" && this.props.host_id === parsedData.host_id) {
            let results = parsedData;
            console.log(results)
            if (results.error === null) {
                this.setState({
                    activatedMessage: `${results.title} has been successfully activated`
                })
            } else if (results.error === "No questions found") {
                this.setState({
                    activatedMessage: 'Could not activate. No questions found for that survey'
                })
            }
        }

    }

}


export default withRouter(HostRenderSurvey);