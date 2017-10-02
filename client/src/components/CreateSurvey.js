import React, { Component } from 'react';
import SurveyQuestionInput from './SurveyQuestionInput.js'

export default class CreateSurvey extends Component {
    constructor(props) {
        super(props);
        this.state = {
            host_id: props.host_id,
            title: "",
            question: [
                {
                    question_number: 1,
                    text: ""
                },
            ]
        }
    }

    handleChange = (event) => {
        this.setState({ title: event.target.value });
    }

    handleChangeQuestion = (event) => {                         // Finds the attribute 'target' then changes the this.state of that target accordingly
        let index = event.target.getAttribute('target') - 1
        let questionNum = event.target.getAttribute('target')
        let new_question = Object.assign([], this.state.question)
        new_question[index][questionNum].text = event.target.value
        this.setState({ question: new_question });
    }

    render() {
        let questionForm = this.state.question.map((data) => {                   // Maps through and renders the Question Inputs.
            return <SurveyQuestionInput num={Object.keys(data)} value={data[Object.keys(data)].text} onChange={this.handleChangeQuestion} remove={this._RemoveQuestion} />

        })

        return (
            <div>
                <div>
                    <p>Survey Title:
                    <input type='text' value={this.state.title} onChange={this.handleChange}></input>
                    </p>
                </div>
                {questionForm}                                                              {/* Where the maped question inputs are */}
                <br />
                <button onClick={this._addQuestion}>Add Question</button>
                <button onClick={this._submitSurvey}>Submit</button>
            </div >
        )

    }

    _addQuestion = () => {                                  // Adds a new form to this.state.question to add another Question form
        let new_form = this.state.question
        var new_num = new_form.length + 1
        let new_object = {}
        new_object[new_num] = { text: "" }                      // adding the new object to this.state.question
        new_form.push(new_object)
        this.setState({
            question: new_form
        })
    }

    _RemoveQuestion = (event) => {                              // Removes a Question Form
        let index = event.target.getAttribute('target') - 1
        let object = this.state.question
        let new_object = object.splice(index, 1);
        var formated_object = object.map((data) => {           // this maps through and lowers the question number by one for those after the one that is deleted
            let key = Number(Object.keys(data))
            if (key > index + 1) {
                let new_key = key - 1
                let changed_data = {}
                changed_data[new_key] = data[key]
                return changed_data
            }
            return data
        })
        this.setState({
            question: formated_object
        })
    }

    _submitSurvey = () => {
        console.log(this._createPayload())
        this.props.sendMessage(this._createPayload());
    }

    _createPayload = () => {
        let question_object = this.state.question.map((data) => {
            return data
        }, {})
        let payload = {
            TYPE: 'CREATESURVEY',
            HOST_ID: this.state.host_id,
            TITLE: this.state.title,
            PAYLOAD: question_object
        }
        return JSON.stringify(payload);


    }
}