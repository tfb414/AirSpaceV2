import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import CreateSurvey from './CreateSurvey'
import CreateQuiz from './CreateQuiz'
const CreateQuizSurvey = (props) => {
    return (
        <div>
            <Link to={`/Host/Create/Survey`}> Survey </Link>
            <Link to={`/Host/Create/Quiz`}> Quiz </Link>
        </div>
    );
};

export default CreateQuizSurvey;