import React, { Component } from 'react';
import bluelogo from '../stylesheets/images/bluelogo.svg';

const WelcomePage = (props) => {
    return (
        <div className="branding">
            <img className="logo" src={bluelogo} />
            <h1 className="branding">Welcome to AirSpace, {props.first_name}</h1>
            <p>Your Teacher ID: {props.host_id}</p>
        </div>
    )
}

export default WelcomePage;
