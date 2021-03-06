import React, { Component } from 'react';
import { withRouter } from 'react-router';
import QuizQuestionInput from './QuizQuestionInput.js';
import RequiredFillOutMessage from './RequiredFillOutMessage';

class CreateQuiz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            filledOut: true,
            question: [
                {
                    question_number: 1,
                    text: "",
                    options: [{ text: "", value: true, option_id: null }, { text: "", value: false, option_id: null }],
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

    handleChangeOption = (event) => {
        let target = event.target.getAttribute('target')
        let new_question = Object.assign([], this.state.question)
        new_question[Number(target[0])].options[Number(target[1])].text = event.target.value
        this.setState({ question: new_question })
    }

    handleChangeRadio = (event) => {
        let target = event.target.getAttribute('target')
        let new_question = this.state.question
        let old_options = new_question[Number(target[0])].options
        console.log(old_options)
        let new_options = []
        for (let x = 0; x < old_options.length; x++) {
            console.log(x)
            console.log(target[1])
            if (x === Number(target[1])) {
                new_options.push({ text: old_options[x].text, value: true })
            } else {
                new_options.push({ text: old_options[x].text, value: false })
            }
        }
        new_question[Number(target[0])].options = new_options
        this.setState({ question: new_question })

    }

    render() {
        console.log("rendering.....")
        let questionForm = this.state.question.map((data) => {                   // Maps through and renders the Question Inputs.
            return <QuizQuestionInput num={data.question_number} RonChange={this.handleChangeRadio} Qvalue={data.text} option={data.options} addOption={this._addOption} removeOption={this._RemoveOption} QonChange={this.handleChangeQuestion} OonChange={this.handleChangeOption} remove={this._RemoveQuestion} />

        })

        return (
            <div className='quizBox'>
                <div className='quizInnerBox'>
                    <h1 className='cnqTitle'>Create New Quiz</h1>
                    <div className='quizInnerBox'>
                        <div className="QuestionClump surveyTitleInput">
                            <h3 className='surveyTitle'>Title</h3>
                            <input className='surveyTinput' type='text' value={this.state.title} onChange={this.handleChange}></input>
                        </div>
                        <div>
                            <h3 className='surveyQTitle'>Questions</h3>
                            {questionForm}      {/* Where the mapped question inputs are */}
                        </div>
                        <div className='bottomButtons'>
                            <button className='addSq' onClick={this._addQuestion}> + </button>
                            <button type="button" className="btn btn-outline-secondary submitSurvey" onClick={this._submitSurvey}>Submit</button>
                        </div>
                        <RequiredFillOutMessage filledOut={this.state.filledOut} />
                    </div>
                </div>
            </div>
        )
    }

    _addQuestion = () => {                                  // Adds a new form to this.state.question to add another Question form
        let new_form = this.state.question
        var new_num = new_form.length + 1
        let new_object = { question_number: new_num, text: "", options: [{ text: "", value: true, option_id: null }, { text: "", value: false, option_id: null }] }                     // adding the new object to this.state.question
        new_form.push(new_object)
        this.setState({
            question: new_form
        })
    }

    _addOption = (event) => {
        let new_form = this.state.question
        let index = Number(event.target.getAttribute('target') - 1)
        let new_object = { text: "", value: false, option_id: null }
        new_form[index].options.push(new_object)
        this.setState({
            question: new_form
        })

    }

    _RemoveOption = (event) => {
        let new_form = this.state.question
        let index = Number(event.target.getAttribute('target') - 1)
        if (new_form[index].options.length === 2) {
            return
        }
        new_form[index].options.pop()
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
                let changed_data = { question_number: new_key, text: data.text, options: data.options }
                return changed_data
            }
            return data
        })
        console.log(formated_object)
        this.setState({
            question: formated_object
        })
    }

    _submitSurvey = () => {
        let questionList = this.state.question
        let formIsFilled = true
        questionList.forEach((data) => {
            if (data.text === "") {
                formIsFilled = false
            }
            data.options.forEach((option) => {
                if (option.text === "") {
                    formIsFilled = false
                }
            })
        })
        if (this.state.title === "") {
            formIsFilled = false
        }
        this.setState({
            filledOut: formIsFilled
        }, () => { 
            if (this.state.filledOut === true) {
            console.log(this._createPayload())
            this.props.sendMessage(this._createPayload());
            setTimeout(() => { 
                this.props.history.push('/Host/Your Quizzes/')
            }, 100)    
        }
        })

    }

    _createPayload = () => {
        let question_object = this.state.question.map((data) => {
            return data
        }, {})
        let payload = {
            type: 'CREATESQ',
            value: 'quiz',
            title: this.state.title,
            payload: question_object
        }
        return JSON.stringify(payload);


    }
}

export default withRouter(CreateQuiz);