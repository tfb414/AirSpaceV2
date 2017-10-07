import React from 'react';

const SurveyQuestionInput = ({value, onChange, num, remove}) => {
    return (
        <div className='questionItem'>
            <p>{num}.</p>
            <div className='questionClump'>
                <textarea target={num} value={value} onChange={onChange}></textarea>
                <button className='subtractQues' onClick={remove} target={num}>—</button>
            </div>
        </div>
    );
};

export default SurveyQuestionInput;