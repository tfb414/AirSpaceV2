import React from 'react';

const RenderQuizRadio = ({text, option_id, question_number, RonChange }) => {
    return (
        <div>
            <input type="radio" name={question_number} value={option_id} onClick={RonChange}></input> {text}
        </div>
    );
};

export default RenderQuizRadio;