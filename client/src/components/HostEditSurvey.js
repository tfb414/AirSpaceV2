import React, { Component } from 'react';
import SurveyQuestionInput from './SurveyQuestionInput.js';
import RequiredFillOutMessage from './RequiredFillOutMessage';
import { withRouter } from 'react-router';
import guid from 'guid';

class HostEditSurvey extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activatedMessage: "",
            waitingOnData: true,
            title: "",
            question: [],
            deleted_questions: [],
            filledOut: true
        }
    }

    componentWillMount() {
        let payload = { type: "REQUESTEDITSQ", sqtype: this.props.sqtype, sq_id: this.props.match.params.id };
        this.props.sendMessage(JSON.stringify(payload));
        this.props.connection.onmessage = event => {
            let parsedData = JSON.parse(event.data);
            this._receiveMessage(parsedData);
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
        if (this.state.waitingOnData === true && this.state.activatedMessage === "") {
            return (
                <div className="SQComponent center">
                    <h3>Waiting on Survey...</h3>
                </div>
            )
        } else if (this.state.waitingOnData === true && this.state.activatedMessage !== "") {
            return (
                <div className="SQComponent center">
                    <h3>{this.state.activatedMessage}</h3>
                </div>
            )
        } else if (this.state.waitingOnData === false) {
            let questionForm = this.state.question.map((data) => {                   
            // Maps through and renders the Question Inputs.
            return <SurveyQuestionInput num={data.question_number} value={data.text} onChange={this.handleChangeQuestion} remove={this._RemoveQuestion} />

        })

        return (
            <div className='surveyBox SQComponent'>
                <h1 className='cnsTitle'>Edit Survey</h1>
                <div className='surveyInnerBox'>
                    <div className="surveyTitleInput">
                        <h3 className='surveyTitle'>Title</h3>
                        <input className='surveyTinput' type='text' value={this.state.title} onChange={this.handleChange}></input>
                    </div>
                    <div>
                        <h3 className='surveyQTitle'>Questions</h3>
                        {questionForm}       {/* Where the mapped question inputs are */}
                    </div>
                    <div className='bottomButtons'>
                        <button className='addSq' onClick={this._addQuestion}> + </button>
                        <button type="button" className="btn btn-outline-secondary submitSurvey" onClick={this._submitSurvey}>Submit</button>
                    </div>
                    <RequiredFillOutMessage filledOut={this.state.filledOut} />
                    <p>*** Warning: Clicking submit will clear all responses associated with this survey. ***</p>
                </div>
            </div >
        )
        }
        

    }

    _addQuestion = () => {                                  // Adds a new form to this.state.question to add another Question form
        let new_form = this.state.question
        var new_num = new_form.length + 1
        let new_object = { question_number: new_num, text: "", question_id: null }                     // adding the new object to this.state.question
        new_form.push(new_object)
        this.setState({
            question: new_form
        })
    }

    _RemoveQuestion = (event) => {                              // Removes a Question Form
        let index = event.target.getAttribute('target') - 1;
        let object = this.state.question;
        let new_deleted_questions = this.state.deleted_questions;
        let new_object = object.splice(index, 1);
        if(new_object[0].question_id !== null) {
            new_deleted_questions.push(new_object[0].question_id)
        }
        var formated_object = object.map((data) => {           // this maps through and lowers the question number by one for those after the one that is deleted
            let key = data.question_number
            if (key > index + 1) {
                let new_key = key - 1;
                let changed_data = { question_number: new_key, text: data.text, question_id: data.question_id };
                return changed_data;
            }
            return data;
        })
        this.setState({
            question: formated_object,
            deleted_questions: new_deleted_questions
        })
    }

    _submitSurvey = () => {
        let questionList = this.state.question
        let formIsFilled = true
        questionList.forEach((data) => {
            if (data.text === "") {
                formIsFilled = false
            }
        })
        if (this.state.title === "") {
            formIsFilled = false
        }
        this.setState({
            filledOut: formIsFilled
        }, () => { 
            if (this.state.filledOut === true) {
            // console.log(this._createPayload())
                this.props.sendMessage(this._createPayload());
                setTimeout(() => { 
                    this.props.history.push('/Host/Your Surveys/')
                }, 100)    
            }
        })
    }

    _createPayload = () => {
        let question_object = this.state.question.map((data) => {
            return data;
        }, {})
        question_object = question_object.filter((q) => {return q;});
        let payload = {
            type: 'EDITSQ',
            sq_id: this.props.match.params.id,
            sqtype: 'survey',
            title: this.state.title,
            payload: question_object,
            deleted_questions: this.state.deleted_questions
        }
        console.log(payload);
        return JSON.stringify(payload);
    }
    _receiveMessage = (parsedData) => {
        if (parsedData.type === 'DISPLAYEDITSQ' && parsedData.sqtype === 'survey' &&  (parsedData.host_id === this.props.host_id)) {
            let results = parsedData;
            if (results.error === null) {
                let new_form = [];
                results.payload.forEach((data) => {
                    new_form[data.question_number - 1] = { question_number: data.question_number, text: data.text, question_id: data.question_id }   
                    // adding the new object to this.state.question
                })
                this.setState({
                    title: results.title,
                    waitingOnData: false,
                    question: new_form
                })
            } else {
                this.setState({
                    activatedMessage: results.error
                })
            }
        } 
    }
}

export default withRouter(HostEditSurvey);