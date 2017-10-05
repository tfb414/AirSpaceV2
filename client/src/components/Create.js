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
                <Route path="/Host/Create/Quiz" component={() => <CreateQuiz {...props} />}/>
                <Route path="/Host/Create/Survey" component={() => <CreateSurvey {...props} />} />
                <Route exact path="/Host/Create" component={() => <CreateQuizSurvey {...props}/>}/>
            </Switch>
        </div>

    )
};

export default Create;