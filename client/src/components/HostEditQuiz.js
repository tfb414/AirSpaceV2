import React, { Component } from 'react';
import QuizQuestionInput from './QuizQuestionInput.js'

export default class HostEditQuiz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            waitingOnData: true,
            title: "",
            question: []
        }
    }

    componentWillMount() {
        console.log(this.props.match.match.params.id)
        let payload = { type: "REQUESTEDITSQ", sqtype: this.props.sqtype, sq_id: this.props.match.match.params.id };
        this.props.sendMessage(JSON.stringify(payload));
   
        this.props.connection.onmessage = event => {
            let parsedData = JSON.parse(event.data);
            let results = this._receiveMessage(parsedData);
            console.log(results)
            let keys = Object.keys(results.payload)
            let new_form = keys.map((key) => {
                console.log(key)
                console.log(results.payload[key])
                return { question_number: results.payload[key].question_number, question_id: results.payload[key].question_id, text: results.payload[key].text, options: results.payload[key].options }                     // adding the new object to this.state.question
            })
            this.setState({
                title: results.title,
                waitingOnData: false,
                question: new_form
            })
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
            if (x === Number(target[1])) {
                new_options.push({ text: old_options[x].text, value: true, option_id: old_options[x].option_id })
            } else {
                new_options.push({ text: old_options[x].text, value: false, option_id: old_options[x].option_id })
            }
        }
        new_question[Number(target[0])].options = new_options
        this.setState({ question: new_question })

    }

    render() {
        if (this.state.waitingOnData === true) {
            return (
                <div>
                    <h3>Waiting on Quiz...</h3>
                </div>
            )
        }
        else if (this.state.waitingOnData === false) { 
            let questionForm = this.state.question.map((data) => {                   // Maps through and renders the Question Inputs.
            return <QuizQuestionInput num={data.question_number} RonChange={this.handleChangeRadio} Qvalue={data.text} option={data.options} addOption={this._addOption} removeOption={this._RemoveOption} QonChange={this.handleChangeQuestion} OonChange={this.handleChangeOption} remove={this._RemoveQuestion} />

        })

        return (
            <div className='quizBox'>
                <div className='quizInnerBox'>
                    <h1 className='cnqTitle'>Edit Quiz</h1>
                    <div className='quizInnerBox'>
                        <h3 className='quizTitle'>Title</h3>
                        <input className='quizQuesText' type='text' value={this.state.title} onChange={this.handleChange}></input>
                        <h3 className='surveyQTitle'>Questions</h3>
                        {questionForm}      {/* Where the mapped question inputs are */}
                        <div className='bottomButtons'>
                            <button className='addQuizQues' onClick={this._addQuestion}>Add Question +</button>
                            <button className='submitQuiz' onClick={this._submitSurvey}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        )
        }
        

    }

    _addQuestion = () => {                                  // Adds a new form to this.state.question to add another Question form
        let new_form = this.state.question
        var new_num = new_form.length + 1
        let new_object = { question_number: new_num, question_id: null, text: "", options: [{ text: "", value: true, option_id: null }, { text: "", value: false, option_id: null }] }                     // adding the new object to this.state.question
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
                let changed_data = { question_number: new_key, question_id: data.question_id, text: data.text, options: data.options }
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
        console.log(this._createPayload());
        console.log(this.props);
        this.props.sendMessage(this._createPayload());

    }

    _createPayload = () => {
        let question_object = this.state.question.map((data) => {
            return data
        }, {})
        let payload = {
            type: 'EDITSQ',
            sqtype: 'quiz',
            title: this.state.title,
            payload: question_object
        }
        return JSON.stringify(payload);


    }
    _receiveMessage = (parsedData) => {
        if (parsedData.type === 'DISPLAYEDITSQ' && parsedData.sqtype === 'quiz' &&  parsedData.host_id === this.props.host_id) {
                return parsedData;
        } 
    }
}