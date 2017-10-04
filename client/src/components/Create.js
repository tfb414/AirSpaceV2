import React from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';
import CreateSurvey from './CreateSurvey'
import CreateQuiz from './CreateQuiz'
import HDNavButton from './HDNavButton';
import CreateQuizSurvey from './CreateQuizSurvey'

const Create = (props) => {
    return (
        <div>
            {/* <NavLink to={`/host/Create/survey`}> Survey </NavLink>
            <NavLink to={`/host/Create/quiz`}> Quiz </NavLink> */}
            <Switch>
                <Route exact path="/host/Create" component={() => <CreateQuizSurvey {...props}/>}/>
                <Route path="/host/Create/Quiz" component={() => <CreateQuiz {...props} />}/>
                <Route path="/host/Create/Survey" component={() => <CreateSurvey {...props} />} />
            </Switch>
        </div>

    )
};

export default Create;