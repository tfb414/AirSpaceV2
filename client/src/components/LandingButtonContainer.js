import React from 'react';
import Button from './Button';

const handleHostClick = () => {
    console.log('fhqwhgads');
    window.location.assign('/host/auth/google');
}

const handleGuestClick = () => {
    console.log('noooo');
    window.location.assign('/guest/auth/google');
}

const LandingButtonContainer = () => {
    return (
        <div className="landingButtonContainer">
            <Button className="landingButton" text="Host" onClick={handleHostClick}/>
            <Button className="landingButton" text="Guest" onClick={handleGuestClick}/>
        </div>
    )
}
export default LandingButtonContainer;