import React from 'react';

const SurveyQuestionInput = ({value, onChange, num, remove}) => {
    return (
        <div className='questionItem'>
            <p>{num}.</p>
            <input type='text' target={num} value={value} onChange={onChange}></input>
            <button onClick={remove} target={num}>—</button>
        </div>
    );
};

export default SurveyQuestionInput;