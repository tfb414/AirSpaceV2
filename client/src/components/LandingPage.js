import React from 'react'
import LandingButtonContainer from './LandingButtonContainer'
import logo from '../stylesheets/images/plane.svg';

const LandingPage = () => {
    return (
        <div className="landingPage">
            <div className="branding">
                <img src={logo} />
                <h1 className="branding">AirSpace</h1>
            </div>
            <LandingButtonContainer />
        </div>
    )
}
export default LandingPage;