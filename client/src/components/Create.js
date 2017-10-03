import React from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';
import CreateSurvey from './CreateSurvey'
import CreateQuiz from './CreateQuiz'
import HDNavButton from './HDNavButton';

const Create = (props) => {
    let navBar = props.name.map((link) => {
        return <HDNavButton match={props.match} name={link} />
    })
    console.log(props)
    return (
        <div>
            <NavLink to={`/host/create/survey`}> Survey </NavLink>
            <NavLink to={`/host/create/quiz`}> Quiz </NavLink>
            <Switch>
                <Route path="/host/create/quiz" component={(host_id) => <CreateQuiz {...props} />}/>
                <Route path="/host/create/survey" component={(host_id) => <CreateSurvey {...props} />} />
            </Switch>
        </div>

    )
};

export default Create;