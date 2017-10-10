import React from 'react'

const ActivateSurvey = ({ message }) => {
    if (message === "") {
        return (
        <span></span>
        )
    } else {
        return (
            <span>{ message }</span>
        )
    }
    
}

export default ActivateSurvey