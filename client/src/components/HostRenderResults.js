import React, { Component } from 'react';
import RenderResultsTable from './RenderResultsTable';

class HostRenderResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            host_id: this.props.host_id,
            results: {},
            nameList: [],
            questionList: {},
            resultsReceived: false
        }
    }

    componentWillMount() {
        let payload = {
            type: 'REQUESTRESULTS',
            sq_id: this.props.match.match.params.id
        };
        this.props.connection.send(JSON.stringify(payload));
        this.props.connection.onmessage = event => {
            let parsedData = JSON.parse(event.data);
            let results = this._receiveMessage(parsedData);
            this.setState({
                results,
                resultsReceived: true
            })
        }
        if (this.state.results === {}) {
            return;
        }
        let names = Object.keys(this.state.results.payload);
        names.forEach((name)=> {
            let data = this.state.results[name];
            let new_name = data.first_name + " " + data.last_name;
            let new_nameList = this.state.nameList;
            let new_questionList = this.state.questionList;
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
                questionList: new_questionList
            })
    }


    render() {
        // let questions=Object.keys(this.state.question)
        if (this.state.resultsReceived) {
            return (
                <div>
                    <h1>{this.state.results.title}</h1>
                    <RenderResultsTable name={this.state.nameList} question={this.state.questionList}/>
                </div>
            );
        } else {
            return (
                <div>
                    <h1>Waiting for results...</h1>
                </div>
            );
        }
    }
    _receiveMessage = (parsedData) => {
        if (parsedData.type === 'DISPLAYRESULTS' && this.state.host_id === parsedData.host_id) {
            console.log(parsedData);
            return parsedData;
        }

    }
}

export default HostRenderResults;