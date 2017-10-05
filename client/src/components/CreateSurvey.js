import React, { Component } from 'react';
import SurveyQuestionInput from './SurveyQuestionInput.js'

export default class CreateSurvey extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
        let new_question = Object.assign([], this.state.question)
        new_question[index].text = event.target.value
        this.setState({ question: new_question });
    }

    render() {
        let questionForm = this.state.question.map((data) => {                   // Maps through and renders the Question Inputs.
            return <SurveyQuestionInput num={data.question_number} value={data.text} onChange={this.handleChangeQuestion} remove={this._RemoveQuestion} />

        })

        return (
            <div className='surveyBox'>
                <div className='surveyInnerBox'>
                    <h1 className='cnsTitle'>Create New Survey</h1>
                    <h3 className='surveyTitle'>Title</h3>
                    <input type='text' value={this.state.title} onChange={this.handleChange}></input>
                    {questionForm}                                 {/* Where the mapped question inputs are */}
                    <div className="bottomButtons">
                        <button className="addSq" onClick={this._addQuestion}>Add Question + </button>
                        <button className="subSurvey" onClick={this._submitSurvey}>Submit</button>
                    </div>
                </div>
            </div >
        )

    }

    _addQuestion = () => {                                  // Adds a new form to this.state.question to add another Question form
        let new_form = this.state.question
        var new_num = new_form.length + 1
        let new_object = { question_number: new_num, text: "" }                     // adding the new object to this.state.question
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
            let key = data.question_number
            if (key > index + 1) {
                let new_key = key - 1
                let changed_data = { question_number: new_key, text: data.text }
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
            type: 'CREATESURVEYQUIZ',
            vale: 'survey',
            title: this.state.title,
            payload: question_object
        }
        return JSON.stringify(payload);


    }
}