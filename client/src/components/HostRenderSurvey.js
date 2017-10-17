import React, { Component } from 'react';
import { withRouter } from 'react-router';
import HostRenderResults from './HostRenderResults';
import ActivateSurvey from './ActivateSurvey.js';

class HostRenderSurvey extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activatedMessage: "",
            sqListMessage: "",
            activatedsq_id: 0,
            refresh: 0,
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
        setInterval(() => {
            let counter = 1 + this.state.refresh
            if (counter < 4) {
                this.setState({
                    refresh: counter
                })
            } else {
                this.setState({
                    refresh: counter,
                    activatedMessage: "",
                    activatedsq_id: 0
                })
            }
        }, 1000)
    }

    render() {
        if (this.state.waitingOnData === true && this.state.sqListMessage === "") {
            return (
                <div className="SQComponent">
                </div>
            )
        } else if (this.state.waitingOnData === true && this.state.sqListMessage !== "") {
            return (
                <div>
                    <h3>{this.state.sqListMessage}</h3>
                </div>
            )
        } else if (this.state.waitingOnData === false) {
        let surveys = this.state.results.map((data) => {
            let activatedTR;
            if (data.sq_id === Number(this.state.activatedsq_id)) {
                activatedTR = <tr><td colSpan="2"><ActivateSurvey message={this.state.activatedMessage} /></td></tr>
            } else {
                activatedTR = "";
            }
            return (
                <tbody>
                <tr className="SQFunctions">
                    <td className="SQTitle">
                        <p>{data.sq_name}</p>
                    </td>
                    <td>
                        <button type="button" className="btn btn-outline-secondary" value={data.sq_id} onClick={this._viewResults}>Results</button>
                        <button type="button" className="btn btn-outline-secondary" value={data.sq_id} onClick={this._createSurveyPayload}>Activate</button>
                        <button type="button" className="btn btn-outline-secondary" value={data.sq_id} onClick={this._editSQ}>Edit</button>
                        <button type="button" className="btn btn-outline-secondary" value={data.sq_id} onClick={this._deleteSQ}>Delete</button>
                    </td>
                </tr>
                {activatedTR}
                </tbody>
            )
        })
        let title;
        if (this.props.sqtype === 'survey') {
            title = "Your Surveys"
        } else {
            title = "Your Quizzes"
        }
        return (
            <div className="SQComponent">
                <div className="HostSQRenderTitleActivate">
                    <h1 className="HostSQRenderTitle">{title}</h1>
                </div>
                <div className="yourSQTable">
                    <table className="table table-hover">
                        {surveys}
                    </table>
                </div>
            </div>
        );
        }
    }

    _viewResults = (event) => {
        if (this.props.sqtype === 'survey') {
            this.props.history.push(`/Host/Your Surveys/${event.target.value}`);
        } else if (this.props.sqtype === 'quiz') {
            this.props.history.push(`/Host/Your Quizzes/${event.target.value}`);
        }

    }

    _editSQ = (event) => {
        if (this.props.sqtype === 'survey') {
            this.props.history.push(`/Host/Your Surveys/Edit/${event.target.value}`);
        } else if (this.props.sqtype === 'quiz') {
            this.props.history.push(`/Host/Your Quizzes/Edit/${event.target.value}`);
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
            this.props.history.push(`/Host/Your Surveys`);
        } else if (this.props.sqtype === 'quiz') {
            this.props.history.push(`/Host/Your Quizzes`);
        }
    }

    _createSurveyPayload = (event) => {
        let payload = {
            type: "ACTIVATESQ",
            sqtype: this.props.sqtype,
            sq_id: event.target.value
        };
        payload = JSON.stringify(payload);
        this.props.sendMessage(payload);
    }
    _redirectCreate = (e) => {
        e.preventDefault();
        this.props.history.push(`/Host/Create`);
    }
    _receiveMessage = (parsedData) => {
        if (parsedData.type === 'DISPLAYSQLIST' && this.props.host_id === parsedData.host_id) {
            if (parsedData.error === null) {
                let results = parsedData.payload;
                this.setState({
                    waitingOnData: false,
                    results: results
                });
            } else if (parsedData.error === "Nothing found.") {
                let name;
                if (parsedData.sqtype === 'survey') {
                    name = "surveys";
                } else {
                    name = "quizzes";
                }
                let create = <a href='#' target="_blank" rel="noopener noreferrer" onClick={this._redirectCreate}>Create</a>
                this.setState({
                    sqListMessage: `No ${name} found. Please go to the ${Create} page to add surveys/quizzes.`
                })
            }

        } else if (parsedData.type === "ACTIVATEDSQ" && this.props.host_id === parsedData.host_id) {
            let results = parsedData;
            if (results.error === null) {
                this.setState({
                    refresh: 0,
                    activatedsq_id: results.sq_id,
                    activatedMessage: `${results.title} has been successfully activated.`
                })
            } else if (results.error === "No questions found") {
                this.setState({
                    refresh: 0,
                    activatedsq_id: results.sq_id,
                    activatedMessage: `Could not activate. No questions found.`
                })
            }
        }

    }

}


export default withRouter(HostRenderSurvey);