import React, { Component } from 'react';
import RenderQuizQuestion from './RenderQuizQuestion';
import { withRouter } from 'react-router';

class GuestRenderQuiz extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            sq_id: this.props.sq_id,
            payload: []
        })
    }

    componentWillMount() {
        let keys = Object.keys(this.props.payload)
        let data = this.props.payload
        keys.forEach((key) => {
            let new_payload = this.state.payload
            new_payload.push({ question_id: data[key].question_id, option_id: "" })
            this.setState({ payload: new_payload })
        })
    }

    handleChangeRadio = (event) => {
        let new_payload = this.state.payload
        let index = Number(event.target.name) - 1
        new_payload[index].option_id = event.target.value
        this.setState({
           payload: new_payload
       }) 
    }

    render() {
        let keys = Object.keys(this.props.payload)
        let data = this.props.payload
        let quizForm = keys.map((key) => {
            let index = keys.indexOf(key)
            return <RenderQuizQuestion RonChange={this.handleChangeRadio} index={index} option={data[key].options} question_number={data[key].question_number} text={data[key].text}/>
        })
        return (
            <div>
                <h2>{this.props.title}</h2>
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
        this.props.sendMessage(JSON.stringify(payload));
        this.props.onSubmit();
        localStorage.removeItem("sqtype");
        localStorage.removeItem("sq_id");
        localStorage.removeItem("title");
        localStorage.removeItem("payload");
        this.props.history.push('/Guest/Waiting/');
    }
}

export default withRouter(GuestRenderQuiz);