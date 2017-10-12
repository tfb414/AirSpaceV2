import React, { Component } from 'react';
import { withRouter } from 'react-router';
import env from '../utility/env';
import { connect } from 'react-redux';
import * as actions from '../actions';
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
        this.connection = new WebSocket(env);
    }

    componentWillMount() {
        let payload = { type: "REQUESTSQLIST", sqtype: this.props.sqtype };
        this.connection.onopen = () => {
            this._sendMessage(JSON.stringify(payload));

            this.connection.onmessage = event => {
                let parsedData = JSON.parse(event.data);
                this._receiveMessage(parsedData);
            }
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
                    activatedMessage: ""
                })
            }
            
        }, 1000)
    }

    render() {
        console.log(this.props.user.host_id);
        console.log(this.props);
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
                        <hr />
                    </td>
                    <td>
                        <button type="button" className="btn btn-outline-secondary" value={data.sq_id} onClick={this._viewResults}>Results</button>
                        <button type="button" className="btn btn-outline-secondary" value={data.sq_id} onClick={this._createSurveyPayload}>Activate</button>
                        <button type="button" className="btn btn-outline-secondary" value={data.sq_id} onClick={this._editSQ}>Edit</button>
                        <button type="button" className="btn btn-outline-secondary" value={data.sq_id} onClick={this._deleteSQ}>Delete</button>
                    </td>
                </tr>  
            )
        })
        if (this.props.sqtype === 'survey') {
            let title = "Your Surveys"
        } else {
            let title = "Your Quizzes"
        }
        return (
            <div className="SQComponent">
                <div className="HostSQRenderTitleActivate">
                        <h1 className="HostSQRenderTitle">{title}</h1>
                        <ActivateSurvey message={this.state.activatedMessage} /> 
                </div> 
                <hr className="TitleHR"/>
                <table className="HostSQTable">
                    {surveys}
                </table>
            </div>
        );
    }

<<<<<<< HEAD
    // componentDidMount() {
    //     setTimeout(
    //         this.setState({
    //             activatedMessage: ""
    //         }), 2000)
    // }


=======
>>>>>>> bd59a42f5e0ac255f166ba6de778dbb39fef3b2d
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
        this._sendMessage(payload);
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
        this._sendMessage(payload);
    }

    _sendMessage = (payload) => {
        this.connection.send(payload);
    }

    _receiveMessage = (parsedData) => {
        if (parsedData.type === 'DISPLAYSQLIST' && this.props.user.host_id === parsedData.host_id) {
            let results = parsedData.payload;
            console.log(results);
            this.setState({
                waitingOnData: false,
                results: results
            })
        } else if (parsedData.type === "ACTIVATEDSQ" && this.props.user.host_id === parsedData.host_id) {
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

const mapStateToProps = state => {
    return {
    user: state.user,
    connection: state.connection
    }
};

// const mapDispatchToProps = dispatch => ({
//     setHostId: (host_id) => {
//         dispatch(actions.setHostId(host_id))
//     }
// })

export default connect(mapStateToProps)(withRouter(HostRenderSurvey));