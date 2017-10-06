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
        let payload = {
            type: 'REQUESTRESULTS',
            sq_id: '18'
        }
        console.log(this.props);
        console.log(payload);
        this.props.connection.send(JSON.stringify(payload));
        this.props.connection.onmessage = event => {
            let parsedData = JSON.parse(event.data);
            this._receiveMessage(parsedData);
        }
        // this.props.payload.forEach((data) => {
        //     let new_name = data.first_name + " " + data.last_name
        //     let new_nameList = this.state.name
        //     let new_question = this.state.question
        //     data.question.forEach((info) => {
        //         if (new_question[info.text] === undefined) {
        //             new_question[info.text] = []
        //         }
        //         if (info.value != undefined) {
        //             new_question[info.text].push({ text: info.response, value: info.value })
        //         } else {
        //             new_question[info.text].push({ text: info.response, value: 'survey' })
        //         }
                
        //     })
        //     new_nameList.push(new_name);
        //     console.log(new_question);
        //     this.setState({
        //         name: new_nameList,
        //         question: new_question
        //     })
        // })
    }


    render() {
        // let questions=Object.keys(this.state.question)
        return (
            <div>
                <h1>HIII{this.props.title}</h1>
                {/*<RenderResultsTable name={this.state.name} question={this.state.question}/>*/}
            </div>
        );
    }
    _receiveMessage = (parsedData) => {
        if (parsedData.type === 'DISPLAYRESULTS') {
            console.log(parsedData);
        }

    }
}

export default HostRenderResults;