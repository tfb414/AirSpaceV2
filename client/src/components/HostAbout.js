import React, { Component } from 'react';
import { withRouter } from 'react-router';

class HostAbout extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <p>AirSpace is a group response platform that allows students or other members of a group to provide feedback and answer a teacher's or host's questions.<br /><br />
                Group members can initiate or join existing sessions via phone, tablet, or computer by entering their teacher's email. The teacher can then send surveys and view member responses in real time.</p>
                <p>As a host, start by creating a survey or quiz on the <a href='#' target="_blank" rel="noopener noreferrer" onClick={this._redirectCreate}>Create</a> page. Then, view the survey or quiz you created in the <a href='#' target="_blank" rel="noopener noreferrer" onClick={this._redirectSurvey}>Your Surveys</a> or <a href='#' target="_blank" rel="noopener noreferrer" onClick={this._redirectQuiz}>Your Quizzes</a> page respectively. From this page, you have a few options:
                    <ul>
                        <li>Results:  Displays a table of all the students' responses to your survey or quiz. It also shows students' scores if it is a quiz.</li>
                        <li>Activate: Sends the selected survey/quiz to all connected students. After students login to the site, they will be prompted for their teacher's email. Please provide your students with your email address so they can connect with you.</li>
                        <li>Edit: Allows you to edit the selected survey/quiz. Editing a survey will also cause all guest responses associated with this survey/quiz to be cleared.</li>
                        <li>Delete: Will delete the selected survey/quiz and all responses associated with this survey/quiz.</li>
                    </ul>
                </p>
            </div>
        )
    }

    _redirectCreate = (e) => {
        e.preventDefault();
        this.props.history.push(`/Host/Create`);
    }

     _redirectSurvey = (e) => {
        e.preventDefault();
        this.props.history.push(`/Host/Your Surveys`);
    }

    _redirectQuiz = (e) => {
        e.preventDefault();
        this.props.history.push(`/Host/Your Quizzes`);
    }
}

export default withRouter(HostAbout);