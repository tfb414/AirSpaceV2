import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import CreateSurvey from './CreateSurvey'
import CreateQuiz from './CreateQuiz'

const CreateQuizSurvey = (props) => {
    return (
        <div className="createSelection">

            <div className="createBox">
                <h1 className="createTitle">Create</h1>
                <div className="quizOrSurveyBox">
                    <Link className="createOption" to={`/Host/Create/:Survey`}> Survey </Link>
                    <Link className="createOption" to={`/Host/Create/:Quiz`}> Quiz </Link>
                </div>
            </div>
        </div>
    );
};

export default CreateQuizSurvey;