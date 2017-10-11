import React from 'react'

const ActivateSurvey = ({ message }) => {
    let componentClasses = ["ActivateSurvey"]
    if (message !== "") {
        componentClasses.push('show')
    } else {
        componentClasses.push('hidden')
    }

    return (
        <p className={componentClasses.join(' ')}>{ message }</p>
    )
    
    
}

export default ActivateSurvey