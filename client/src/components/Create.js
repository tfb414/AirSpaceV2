import React from 'react';
import { NavLink, Switch } from 'react-router-dom';
import CreateSurvey from './CreateSurvey'
import HDNavButton from './HDNavButton';

const Create = (props) => {
    let navBar = props.name.map((link) => {
        return <HDNavButton match={props.match} name={link} />
    })
    return (
        <div>
            {navBar}
            <Switch>
                <Route path="/host/create/quiz/" />
                <Route path="/host/create/survey/" component={(host_id) => <CreateSurvey host_id={props.host_id} sendMessage={props.sendMessage} />} />
            </Switch>
        </div>

    )
};

export default Create;