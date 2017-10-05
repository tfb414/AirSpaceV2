import React, { Component } from 'react';
import RenderQuizQuestion from './RenderQuizQuestion'

class GuestRenderQuiz extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            sq_id: props.quiz.sq_id,
            payload: []
        })
    }

    componentWillMount() {
        this.props.payload.forEach((data) => {
            let new_payload = this.state.payload
            new_payload.push({ question_id: data.question_id, option_id: "" })
            this.setState({ payload: new_payload })
        })
    }

    handleChangeRadio = (event) => {
        console.log(event.target.value)
        console.log(event.target.name) 
        let new_payload = this.state.payload
        let index = Number(event.target.name) - 1
        new_payload[index].option_id = event.target.value
        this.setState({
           payload: new_payload
       }) 
    }

    render() {
        let quizForm = this.props.payload.map((data) => {
            let new_payload = this.props.payload
            let index = new_payload.indexOf(data)
            return <RenderQuizQuestion RonChange={this.handleChangeRadio} index={index} option={data.option} question_number={data.question_number} text={data.text}/>
        })
        console.log(quizForm)
        return (
            <div>
                <h2>{this.props.quiz.title}</h2>
                {quizForm}
                <button onClick={this._submitQuiz}>Submit</button>
            </div>
        );
    }

    _submitQuiz = () => {
        let payload = {
            type: "RESULTQUIZ",
            sq_id: this.state.sq_id,
            payload: this.state.payload
        }

        console.log(payload)
    }
}

export default GuestRenderQuiz;