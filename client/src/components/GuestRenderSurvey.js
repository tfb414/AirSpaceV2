import React, { Component } from 'react';
import RenderSurveyQuestion from './RenderSurveyQuestion'

class GuestRenderSurvey extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            sq_id: props.survey.sq_id,
            payload: []
        })
    }

    componentWillMount() {
        this.props.payload.forEach((data) => {
            let new_payload = this.state.payload
            new_payload.push({ question_id: data.question_id, response: "" })
            this.setState({ payload: new_payload })
        })
    }

    handleChangeTextarea = (event) => {
        let index = event.target.getAttribute('target')
        let new_payload = this.state.payload
        new_payload[index].response = event.target.value
        this.setState({
            payload: new_payload
        })
    }

    render() {
        let surveyForm = this.props.payload.map((data) => {
            let new_payload = this.props.payload
            let index = new_payload.indexOf(data)
            return <RenderSurveyQuestion TonChange={this.handleChangeTextarea} index={index} question_number={data.question_number} text={data.text} value={this.state.payload[index].response}/>
        })
        return (
            <div>
                <h2>{this.props.survey.title}</h2>
                {surveyForm}
                <button onClick={this._submitSurvey}>Submit</button>
            </div>
        );
    }

    _submitSurvey = () => {
        let payload = {
            type: "RESULTSURVEY",
            sq_id: this.state.sq_id,
            payload: this.state.payload
        }

        console.log(payload)
    }
}

export default GuestRenderSurvey;