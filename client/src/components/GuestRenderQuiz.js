import React, { Component } from 'react';
import RenderQuizQuestion from './RenderQuizQuestion';
import { withRouter } from 'react-router';

class GuestRenderQuiz extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            sq_id: props.sq_id,
            payload: []
        })
    }

    componentWillReceiveProps(nextProps) {
        this._setPayload(nextProps);
    }

    componentWillMount() {
        this._setPayload(this.props);
    }

    handleChangeRadio = (event) => {
        let new_payload = this.state.payload;
        let index = Number(event.target.name) - 1;
        new_payload[index].option_id = event.target.value;
        this.setState({
            payload: new_payload
        })
    }

    render() {
        let keys = Object.keys(this.props.payload)
        let data = this.props.payload
        let quizForm = keys.map((key, index) => {
            return <RenderQuizQuestion RonChange={this.handleChangeRadio} index={index} option={data[key].options} question_number={data[key].question_number} text={data[key].text} />
        })
        return (
            <div className="GuestRenderQuiz">
                <div>
                    <h2>{this.props.title}</h2>
                </div>
                <hr className="TitleHR" />

                <div className="GuestQuizQuestionsContainer">
                    {quizForm}
                </div>
                <div className="button-buttons">
                    <div className="spacing">
                        <button className="inner-button inner-button-secondary" onClick={this._submitQuiz}>Submit</button>
                    </div>
                </div>
            </div >
        );
    }

    _setPayload = (props) => {
        let keys = Object.keys(props.payload);
        let data = props.payload;
        let new_payload = [];
        keys.forEach((key) => {
            new_payload.push({ question_id: data[key].question_id, option_id: "" });
            this.setState({ payload: new_payload })
        })
    }

    _submitQuiz = () => {
        let payload = {
            type: "RESULTQUIZ",
            sq_id: this.props.sq_id,
            payload: this.state.payload
        }
        console.log(payload);
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