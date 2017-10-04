import React from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';
import CreateSurvey from './CreateSurvey'
import CreateQuiz from './CreateQuiz'
import HDNavButton from './HDNavButton';
import CreateQuizSurvey from './CreateQuizSurvey'

const Create = (props) => {
    return (
        <div className="createPage">
            <Switch>
                <Route exact path="/host/Create" component={(host_id) => <CreateQuizSurvey {...props}/>}/>
                <Route path="/host/Create/Quiz" component={(host_id) => <CreateQuiz {...props} />}/>
                <Route path="/host/Create/Survey" component={(host_id) => <CreateSurvey {...props} />} />
            </Switch>
        </div>

    )
};

export default Create;