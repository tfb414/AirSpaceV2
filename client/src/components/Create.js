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
                <Route exact path="/Host/Create" render={() => <CreateQuizSurvey {...props} />} />
                <Route exact path="/Host/Create/Quiz" render={() => <CreateQuiz {...props} />} />
                <Route exact path="/Host/Create/Survey" render={() => <CreateSurvey {...props} />} />

            </Switch>
        </div>

    )
};

export default Create;