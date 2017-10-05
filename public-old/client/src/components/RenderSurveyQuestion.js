import React from 'react';

const RenderSurveyQuestion = ({ TonChange, question_number, text, value, index}) => {
    return (
        <div>
            <h3>{question_number}. {text}</h3>
            <textarea value={value} target={index} onChange={TonChange}></textarea>
        </div>
    );
};

export default RenderSurveyQuestion;