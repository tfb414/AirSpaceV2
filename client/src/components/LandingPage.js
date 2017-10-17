import React, { Component } from 'react';
import LandingButtonContainer from './LandingButtonContainer';
import logo from '../stylesheets/images/mix.svg';

class LandingPage extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="landingPage">

                <a className="aboutLink" href="/About/">About</a>
                <div className="branding">
                    <img className="logo" src={logo} />
                    <h1 className="branding">AirSpace</h1>
                </div>
                <LandingButtonContainer />
            </div>
        );
    }
}
export default LandingPage;