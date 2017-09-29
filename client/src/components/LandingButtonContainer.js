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
        <div>
            <Button text="Host" onClick={handleHostClick}/>
            <Button text="Guest" onClick={handleGuestClick}/>
        </div>
    )
}
export default LandingButtonContainer;