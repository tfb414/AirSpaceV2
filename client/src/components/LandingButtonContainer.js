import React from 'react';
import Button from './Button';

const handleHostClick = () => {
    console.log('fhqwhgads');
    window.location.assign('/auth/google');
}

const LandingButtonContainer = () => {
    return (
        <div>
            <Button text="Host" onClick={handleHostClick}/>
            <Button text="Guest" onClick={()=> console.log('yaaah')}/>
        </div>
    )
}
export default LandingButtonContainer;