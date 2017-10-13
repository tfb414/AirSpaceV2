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
            sq_id: this.props.match.params.id,
            sqtype: this.props.sqtype
        };
        let resultsReceived = false;
        this.props.connection.send(JSON.stringify(payload));
        this.props.connection.onmessage = event => {
            let parsedData = JSON.parse(event.data);
            this._receiveMessage(parsedData);
        }
    }


    render() {
        // let questions=Object.keys(this.state.question)
        if (this.state.waitingOnData === false && this.state.activatedMessage === "") {
            return (
                <div className='resultBox'>
                    <h1 className='resultTableName'>{this.state.results.title}</h1>
                    <RenderResultsTable name={this.state.nameList} question={this.state.questionList}/>
                </div>
            );
        } else if (this.state.waitingOnData === true && this.state.activatedMessage !== "") {
            return (
                <div>
                    <h3>{this.state.activatedMessage}</h3>
                </div>
            )
        } else {
            return (
                <div className='resultBox'>
                    <h1 className='resultTableName'>Waiting for results...</h1>
                </div>
            );
        }
    }
    _receiveMessage = (parsedData) => {
        if (parsedData.type === 'DISPLAYRESULTS' && this.state.host_id === parsedData.host_id) {
            let results = parsedData;
            if (results.error === null) {
                let names = Object.keys(results.payload);
                var new_nameList;
                var new_questionList
                names.forEach((name)=> {
                    let data = results.payload[name];
                    let new_name = data.first_name + " " + data.last_name;
                    new_nameList = this.state.nameList;
                    new_questionList = this.state.questionList;
                    data.question.forEach((question) => {
                        if (new_questionList[question.text] === undefined) {
                            new_questionList[question.text] = []
                        }
                        if (question.value != undefined) {
                            new_questionList[question.text].push({ text: question.response, value: question.value })
                        } else {
                            new_questionList[question.text].push({ text: question.response, value: 'survey' })
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