import React, { Component } from 'react';
import RenderSurveyQuestion from './RenderSurveyQuestion'
import { withRouter } from 'react-router';

class GuestRenderSurvey extends Component {
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

    handleChangeTextarea = (event) => {
        let index = event.target.getAttribute('target');
        let new_payload = this.state.payload;
        new_payload[index].response = event.target.value;
        this.setState({
            payload: new_payload
        })
    }

    render() {
        let surveyForm = this.props.payload.map((data, index) => {
            return <RenderSurveyQuestion TonChange={this.handleChangeTextarea} index={index} question_number={data.question_number} text={data.text} value={this.state.payload[index].response} />
        })
        return (
            <div className="GuestRenderSurvey">
                <div>
                    <h2 className="GuestSurveyTitle">{this.props.title}</h2>
                </div>
                <hr className="TitleHR" />
                <div className="GuestSurveyQuestionsContainer">
                    {surveyForm}
                </div>
                <div className="button-buttons">
                    <div className="spacing">
                        <button className="inner-button inner-button-secondary" onClick={this._submitSurvey}>Submit</button>
                    </div>
                </div>
            </div>
        );
    }

    _submitSurvey = () => {
        let payload = {
            type: "RESULTSURVEY",
            sq_id: this.props.sq_id,
            payload: this.state.payload
        };
        console.log(payload);
        this.props.sendMessage(JSON.stringify(payload));
        this.props.onSubmit();
        localStorage.removeItem("sqtype");
        localStorage.removeItem("sq_id");
        localStorage.removeItem("title");
        localStorage.removeItem("payload");
        this.props.history.push('/Guest/Waiting/');
    }

    _setPayload = (props) => {
        let new_payload = [];
        props.payload.forEach((data) => {
            new_payload.push({ question_id: data.question_id, response: "" });
            this.setState({ payload: new_payload })
        })
    }
}

export default withRouter(GuestRenderSurvey);