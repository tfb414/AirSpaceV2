import React, { Component } from 'react';

class HostRenderSurvey extends Component {
    constructor(props) {
        super(props);
        this.state = {
            waitingOnData: true
        }
    }

    componentWillMount() {
        let payload = { type: "REQUESTSURVEY" }
        this.props.sendMessage(JSON.stringify(payload))
        if (this.props.payload != false) {
            
        }
    }

    render() {
        if (this.state.waitingOnData) {
            return (
            <div>
                <h1>Searching for you Survey's and Quizzes</h1>
            </div>
            )
        }
        return (
            <div>
                <h1>Hello!</h1>
            </div>
        );
    }

    componentDidMount() {
        
    }
    

}

export default HostRenderSurvey;