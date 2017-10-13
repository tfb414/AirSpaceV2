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
                    <button type="button" className="btn btn-outline-secondary"><Link className="createOption" to={`/Host/Create/Survey`}> Survey </Link></button>
                    <button type="button" className="btn btn-outline-secondary"><Link className="createOption" to={`/Host/Create/Quiz`}> Quiz </Link></button>
                </div>
            </div>
        </div>
    );
};

export default CreateQuizSurvey;