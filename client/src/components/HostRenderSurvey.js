import React, { Component } from 'react';
import { withRouter } from 'react-router'
import HostRenderResults from './HostRenderResults'
import ActivateSurvey from './ActivateSurvey.js'

class HostRenderSurvey extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activatedMessage: "",
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
            if (counter < 3) {
                this.setState({
                refresh: counter
            })
            } else {
                this.setState({
                    refresh: counter,
                    activatedMessage: ""
                })
            }
            
        }, 1000)
    }

    render() {
        if (this.state.waitingOnData) {
            return (
            <div className="SQComponent">   
            </div>
            )
        }
        let surveys = this.state.results.map((data) => {
            return (
                <tr className="SQFunctions">
                    <td className="SQTitle">
                        <p>{data.sq_name}</p>  
                    </td>
                    <td>
                        <button type="button" className="btn btn-outline-secondary" value={data.sq_id} onClick={this._viewResults}>View Results</button>
                        <button type="button" className="btn btn-outline-secondary" value={data.sq_id} onClick={this._createSurveyPayload}>Activate</button>
                        <button type="button" className="btn btn-outline-secondary" value={data.sq_id} onClick={this._editSQ}>Edit</button>
                        <button type="button" className="btn btn-outline-secondary" value={data.sq_id} onClick={this._deleteSQ}>Delete</button>
                    </td>
                </tr>  
            )
        })
        let title = this.props.sqtype
        title = title.charAt(0).toUpperCase() + title.slice(1)
        return (
            <div className="SQComponent">
                <h1 className="HostSQRenderTitle">{title}</h1>
                <ActivateSurvey message={this.state.activatedMessage} />
                <table className="HostSQTable">
                    {surveys}
                </table>
            </div>
        );
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
                    refresh: 0,
                    activatedMessage: `${results.title} has been successfully activated`
                })
            } else if (results.error === "No questions found") {
                this.setState({
                    refresh: 0,
                    activatedMessage: 'Could not activate. No questions found for that survey'
                })
            }
        }

    }

}


export default withRouter(HostRenderSurvey);