import React, { Component } from 'react';
import RenderResultsTable from './RenderResultsTable'

class HostRenderResults extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            name: [],
            question: {}
        })
    }

    componentWillMount() {
        this.props.payload.forEach((data) => {
            let new_name = data.first_name + " " + data.last_name
            let new_nameList = this.state.name
            let new_question = this.state.question
            data.question.forEach((info) => {
                if (new_question[info.text] === undefined) {
                    new_question[info.text] = []
                }
                if (info.value != undefined) {
                    new_question[info.text].push({ text: info.response, value: info.value })
                } else {
                    new_question[info.text].push({ text: info.response, value: 'survey' })
                }
                
            })
            new_nameList.push(new_name)
            console.log(new_question)
            this.setState({
                name: new_nameList,
                question: new_question
            })
        })
    }

    render() {
        let questions=Object.keys(this.state.question)
        return (
            <div className='resultBox'>
                <h1 className='resultTableName'>{this.props.title}</h1>
                <RenderResultsTable name={this.state.name} question={this.state.question}/>
            </div>
        );
    }
}

export default HostRenderResults;