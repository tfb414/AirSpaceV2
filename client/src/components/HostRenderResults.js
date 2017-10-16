import React, { Component } from 'react';
import RenderResultsTable from './RenderResultsTable';

class HostRenderResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            host_id: this.props.host_id,
            waitingOnData: true,
            results: {},
            nameList: [],
            questionList: {},
            activatedMessage: ""
        }
    }

    componentWillMount() {
        let payload = {
            type: 'REQUESTRESULTS',
            sq_id: this.props.match.match.params.id,
            sqtype: this.props.sqtype
        };
        this.props.sendMessage(JSON.stringify(payload));
        this.props.connection.onmessage = event => {
            let parsedData = JSON.parse(event.data);
            this._receiveMessage(parsedData);
        }
            
    }

    componentDidMount() {
        let payload = {
            type: 'REQUESTRESULTS',
            sq_id: this.props.match.match.params.id,
            sqtype: this.props.sqtype
        };
        this.requestInterval = setInterval(() => {
            this.props.sendMessage(JSON.stringify(payload));
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.requestInterval);
    }

    render() {
        if (this.state.waitingOnData === false && this.state.activatedMessage === "") {
            return (
                <div className='resultBox'>
                    <h1 className='resultTableName'>{this.state.results.title}</h1>
                    <RenderResultsTable name={this.state.nameList} question={this.state.questionList} sqtype={this.state.results.sqtype}/>
                </div>
            );
        } else if (this.state.waitingOnData === true && this.state.activatedMessage !== "") {
            return (
                <div className="resultBox">
                    <h3>{this.state.activatedMessage}</h3>
                </div>
            )
        } else {
            return (
                <div className='resultBox'>
                </div>
            );
        }
    }
    _receiveMessage = (parsedData) => {
        if (parsedData.type === 'DISPLAYRESULTS' && this.state.host_id === parsedData.host_id) {
            let results = parsedData;
            console.log(results);
            if (results.error === null) {
                let names = Object.keys(results.payload);
                names = names.sort();
                var new_nameList = [];
                var new_questionList = {};
                names.forEach((name)=> {
                    let data = results.payload[name];
                    let new_name = data.first_name + " " + data.last_name;
                    data.question.forEach((question) => {
                        if (new_questionList[question.id] === undefined) {
                            new_questionList[question.id] = []
                        }
                        if (question.value != undefined) {
                            new_questionList[question.id].push({ question_text: question.text, text: question.response, value: question.value })
                        } else {
                            new_questionList[question.id].push({ question_text: question.text, text: question.response, value: 'survey' })
                        }
                        
                    })
                    new_nameList.push(new_name);
                })
            
                this.setState({
                        nameList: new_nameList,
                        questionList: new_questionList,
                        results,
                        waitingOnData: false
                })
            } else {
                this.setState({
                    activatedMessage: results.error
                })
            }
        }
    }
}

export default HostRenderResults;