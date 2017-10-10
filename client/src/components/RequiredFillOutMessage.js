import React from 'react';

const RequiredFillOutMessage = ({ filledOut }) => {
    if (filledOut === true) { 
        return(<span></span>)
    } else if (filledOut === false) {
        return (
        <span>
                <p>Please complete all form fields</p>
        </span>
    );
    }
    
};

export default RequiredFillOutMessage ;