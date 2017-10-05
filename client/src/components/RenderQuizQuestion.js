import React from 'react';
import RenderQuizRadio from './RenderQuizRadio'

const RenderQuizQuestion = ({ RonChange, question_number, text, value, index, option }) => {
    let radio = option.map((info) => {
        return <RenderQuizRadio text={info.text} option_id={info.option_id} question_number={question_number} RonChange={RonChange}/>
    })
    return (
        <div>
            <h3>{question_number}. {text}</h3>
            {radio}
        </div>
    );
};

export default RenderQuizQuestion;