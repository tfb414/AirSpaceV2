import React from 'react';

const SurveyQuestionInput = ({value, onChange, num, remove}) => {
    return (
        <div>
            <p>{num}.
            <input type='text' target={num} value={value} onChange={onChange}></input><button onClick={remove} target={num}>—</button>
            </p>
        </div>
    );
};

export default SurveyQuestionInput;