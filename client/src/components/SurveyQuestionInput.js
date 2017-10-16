import React from 'react';

const SurveyQuestionInput = ({value, onChange, num, remove}) => {
    return (
        <div>
            <div className='QuestionClump'>
                <p className="SurveyNum">{num}.</p>
                <div className='QuestionClump SQuesInput'>
                    <input className="surveyQInput"type="text" target={num} value={value} onChange={onChange}></input>
                    <button className='subtractQues' onClick={remove} target={num}>—</button>
                </div>
            </div>
        </div>    
    );
};

export default SurveyQuestionInput;