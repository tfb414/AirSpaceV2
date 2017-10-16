import React, { Component } from 'react';
import bluelogo from '../stylesheets/images/bluelogo.svg';

const WelcomePage = (props) => {
    return (
        <div className='welcomePage'>
            <img className='welcomeLogo' src={bluelogo} />
            <h1 className='welcomeLine'>Welcome to AirSpace, {props.first_name}!</h1>
            <div className='welcomeTeacherId'>
                <p>Your Teacher ID:</p>
                <p>{props.host_id}</p>
            </div>
        </div>
    )
}

export default WelcomePage;
