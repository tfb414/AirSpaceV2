import React from 'react';

const RenderSurveyQuestion = ({ TonChange, question_number, text, value, index }) => {
    return (
        <div className="SurveyQuestions">
            <h3>{question_number}. {text}</h3>
            <input type="text" value={value} target={index} onChange={TonChange} />
        </div>
    );
};

export default RenderSurveyQuestion;